// ============================================================
// AUTH SERVICE — Authentication & session management
// ============================================================

import { connectDB }      from '@/lib/db/connection'
import { User }           from '@/lib/db/index'
import { AppError }       from '@/lib/errors/AppError'
import { hashPassword, verifyPassword } from '@/lib/utils/hash.util'
import { signToken }      from '@/lib/utils/jwt.util'
import { validateObjectId } from '@/lib/utils/id.util'
import type { LoginInput, CreateUserInput, UpdateUserInput } from '@/lib/validation/schemas'
import type { IUser }     from '@/lib/db/models/User.model'
import { buildPaginationMeta } from '@/lib/utils/service.util'

export interface AuthTokenResponse {
  token: string
  user:  Omit<IUser, 'passwordHash'>
}

export class AuthService {
  // ── Login ─────────────────────────────────────────────────

  static async login(input: LoginInput): Promise<AuthTokenResponse> {
    await connectDB()

    // Fetch user including passwordHash (normally excluded)
    const user = await User.findOne({
      email:     input.email.toLowerCase(),
      isActive:  true,
      deletedAt: null,
    }).select('+passwordHash')

    if (!user) {
      // Timing-safe: always attempt verification even when user not found
      await verifyPassword('dummy', '$2a$12$dummyhashthatisinvalidbutcomputestimeconstant123456789')
      throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password.', 401)
    }

    const passwordValid = await verifyPassword(input.password, user.passwordHash)
    if (!passwordValid) {
      throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password.', 401)
    }

    // Update last login timestamp (non-blocking)
    User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() }).catch(() => null)

    const token = signToken({
      userId: user._id.toString(),
      email:  user.email,
      role:   user.role,
    })

    // Remove passwordHash before returning
    const userObj = user.toObject()
    const { passwordHash: _, ...safeUser } = userObj

    return { token, user: safeUser as Omit<IUser, 'passwordHash'> }
  }

  // ── Get current user ───────────────────────────────────────

  static async getMe(userId: string): Promise<IUser> {
    await connectDB()
    validateObjectId(userId, 'userId')

    const user = await User.findOne({ _id: userId, isActive: true, deletedAt: null })
    if (!user) throw AppError.notFound('User')
    return user
  }
}

// ── User Management Service ───────────────────────────────────

export class UserService {
  static async createUser(input: CreateUserInput): Promise<IUser> {
    await connectDB()

    const existing = await User.findOne({ email: input.email.toLowerCase() })
    if (existing) {
      throw AppError.conflict('A user with this email address already exists.')
    }

    const passwordHash = await hashPassword(input.password)

    const user = await User.create({
      firstName:    input.firstName,
      lastName:     input.lastName,
      email:        input.email.toLowerCase(),
      passwordHash,
      role:         input.role,
    })

    return user
  }

  static async listUsers(page = 1, limit = 20) {
    await connectDB()
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      User.find({ deletedAt: null }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments({ deletedAt: null }),
    ])

    return { users, meta: buildPaginationMeta(total, page, limit) }
  }

  static async getUserById(id: string): Promise<IUser> {
    await connectDB()
    validateObjectId(id)

    const user = await User.findOne({ _id: id, deletedAt: null })
    if (!user) throw AppError.notFound('User')
    return user
  }

  static async updateUser(id: string, input: UpdateUserInput): Promise<IUser> {
    await connectDB()
    validateObjectId(id)

    const user = await User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: input },
      { new: true, runValidators: true }
    )

    if (!user) throw AppError.notFound('User')
    return user
  }

  static async deleteUser(id: string): Promise<void> {
    await connectDB()
    validateObjectId(id)

    const result = await User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date(), isActive: false }
    )

    if (!result) throw AppError.notFound('User')
  }
}
