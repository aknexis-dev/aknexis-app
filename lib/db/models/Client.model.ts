// ============================================================
// CLIENT MODEL — Converted business clients
// Created from a converted Lead; parent of Projects
// ============================================================

import mongoose, { Schema, type Document, type Model } from 'mongoose'

// ── Enums ─────────────────────────────────────────────────────
export const CLIENT_STATUSES = ['active', 'inactive', 'churned', 'prospect'] as const
export const COMPANY_SIZES   = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'] as const

export type ClientStatus = typeof CLIENT_STATUSES[number]
export type CompanySize  = typeof COMPANY_SIZES[number]

// ── Sub-document interfaces ───────────────────────────────────
export interface IContactPerson {
  name:  string
  email: string
  phone?: string
  title?: string
}

export interface IBillingAddress {
  street:  string
  city:    string
  state:   string
  country: string
  zip?:    string
}

export interface IClientNote {
  _id:       mongoose.Types.ObjectId
  content:   string
  addedBy:   mongoose.Types.ObjectId
  createdAt: Date
}

// ── Document Interface ────────────────────────────────────────
export interface IClient extends Document {
  _id:               mongoose.Types.ObjectId
  companyName:       string
  industry?:         string
  companySize?:      CompanySize
  website?:          string
  primaryContact:    IContactPerson
  additionalContacts: IContactPerson[]
  status:            ClientStatus
  accountManager?:   mongoose.Types.ObjectId
  originLeadId?:     mongoose.Types.ObjectId
  clientSince:       Date
  billingEmail?:     string
  billingAddress?:   IBillingAddress
  notes:             IClientNote[]
  tags:              string[]
  deletedAt?:        Date
  createdAt:         Date
  updatedAt:         Date
}

// ── Schema ────────────────────────────────────────────────────
const ContactPersonSchema = new Schema<IContactPerson>(
  {
    name:  { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 30 },
    title: { type: String, trim: true, maxlength: 100 },
  },
  { _id: false }
)

const BillingAddressSchema = new Schema<IBillingAddress>(
  {
    street:  { type: String, required: true, trim: true },
    city:    { type: String, required: true, trim: true },
    state:   { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    zip:     { type: String, trim: true },
  },
  { _id: false }
)

const ClientNoteSchema = new Schema<IClientNote>(
  {
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

const ClientSchema = new Schema<IClient>(
  {
    companyName:        { type: String, required: true, trim: true, maxlength: 200, index: true },
    industry:           { type: String, trim: true, maxlength: 100 },
    companySize:        { type: String, enum: COMPANY_SIZES },
    website:            { type: String, trim: true, maxlength: 500 },
    primaryContact:     { type: ContactPersonSchema, required: true },
    additionalContacts: { type: [ContactPersonSchema], default: [] },
    status:             { type: String, enum: CLIENT_STATUSES, default: 'active', index: true },
    accountManager:     { type: Schema.Types.ObjectId, ref: 'User', index: true },
    originLeadId:       { type: Schema.Types.ObjectId, ref: 'Lead' },
    clientSince:        { type: Date, default: Date.now },
    billingEmail:       { type: String, trim: true, lowercase: true, maxlength: 254 },
    billingAddress:     BillingAddressSchema,
    notes:              { type: [ClientNoteSchema], default: [] },
    tags:               { type: [String], default: [] },
    deletedAt:          { type: Date, index: true },
  },
  {
    timestamps: true,
    toJSON:     {
      virtuals: true,
      transform: (_doc, ret) => { delete (ret as { __v?: any }).__v; return ret },
    },
    toObject: { virtuals: true },
  }
)

// ── Indexes ───────────────────────────────────────────────────
ClientSchema.index({ companyName: 'text' })
ClientSchema.index({ status: 1, createdAt: -1 })
ClientSchema.index({ accountManager: 1 })
ClientSchema.index({ deletedAt: 1 })

// ── Model ─────────────────────────────────────────────────────
export const Client: Model<IClient> =
  mongoose.models.Client ?? mongoose.model<IClient>('Client', ClientSchema)
