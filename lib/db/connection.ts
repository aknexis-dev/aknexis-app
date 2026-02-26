// ============================================================
// MONGODB CONNECTION — Production-Ready Singleton
// Handles connection pooling, retry logic & Next.js hot-reload
// ============================================================

import mongoose from 'mongoose'

/**
 * Global cache interface
 */
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

/**
 * Extend NodeJS global object (for hot-reload safety)
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.MONGODB_DB_NAME || 'aknexis'

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in .env.local')
}

/**
 * Create global cache (only once)
 */
const globalCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
}

if (!global.mongooseCache) {
  global.mongooseCache = globalCache
}

/**
 * Connect to MongoDB (Singleton Pattern)
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (globalCache.conn) {
    return globalCache.conn
  }

  if (!globalCache.promise) {
    const options: mongoose.ConnectOptions = {
      dbName: DB_NAME,
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    globalCache.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongooseInstance) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`✅ MongoDB connected → ${DB_NAME}`)
        }
        return mongooseInstance
      })
      .catch((error) => {
        globalCache.promise = null
        console.error('❌ MongoDB connection error:', error)
        throw error
      })
  }

  globalCache.conn = await globalCache.promise
  return globalCache.conn
}

/**
 * Graceful disconnection (optional utility)
 */
export async function disconnectDB(): Promise<void> {
  if (globalCache.conn) {
    await mongoose.disconnect()
    globalCache.conn = null
    globalCache.promise = null

    if (process.env.NODE_ENV !== 'production') {
      console.log('🔌 MongoDB disconnected')
    }
  }
}

/**
 * Connection event listeners
 */
mongoose.connection.on('error', (err) => {
  console.error('⚠️ MongoDB runtime error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected')
  globalCache.conn = null
  globalCache.promise = null
})