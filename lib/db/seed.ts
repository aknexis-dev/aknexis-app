// ============================================================
// DATABASE SEED — Development data for testing
// Run: npm run db:seed
// ============================================================

// Must set MONGODB_URI before running:
// MONGODB_URI=mongodb+srv://... npm run db:seed

import mongoose from 'mongoose'
import { hashPassword }  from '../utils/hash.util'

// ── Bootstrap ────────────────────────────────────────────────

async function main() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is required')
    process.exit(1)
  }

  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(uri, { dbName: process.env.MONGODB_DB_NAME ?? 'aknexis' })
  console.log('✅ Connected')

  // Dynamically import models (after connection)
  const { User }    = await import('./models/User.model')
  const { Lead }    = await import('./models/Lead.model')
  const { Client }  = await import('./models/Client.model')
  const { Project } = await import('./models/Project.model')

  // ── Clear existing seed data ──────────────────────────────
  console.log('🗑  Clearing existing data...')
  await Promise.all([
    User.deleteMany({}),
    Lead.deleteMany({}),
    Client.deleteMany({}),
    Project.deleteMany({}),
  ])

  // ── Users ─────────────────────────────────────────────────
  console.log('👤 Creating users...')

  const adminPassword = await hashPassword('Admin@123456')
  const staffPassword = await hashPassword('Staff@123456')

  const [admin, manager, staff] = await User.insertMany([
    {
      firstName:    'James',
      lastName:     'Harrington',
      email:        'admin@aknexis.io',
      passwordHash: adminPassword,
      role:         'admin',
      isActive:     true,
    },
    {
      firstName:    'Elena',
      lastName:     'Park',
      email:        'manager@aknexis.io',
      passwordHash: staffPassword,
      role:         'manager',
      isActive:     true,
    },
    {
      firstName:    'Marcus',
      lastName:     'Chen',
      email:        'staff@aknexis.io',
      passwordHash: staffPassword,
      role:         'staff',
      isActive:     true,
    },
  ])

  console.log(`   ✔ Admin:   admin@aknexis.io / Admin@123456`)
  console.log(`   ✔ Manager: manager@aknexis.io / Staff@123456`)
  console.log(`   ✔ Staff:   staff@aknexis.io / Staff@123456`)

  // ── Leads ─────────────────────────────────────────────────
  console.log('📋 Creating leads...')

  const leads = await Lead.insertMany([
    {
      fullName: 'Alexandra Chen', email: 'a.chen@techcorp.com',
      companyName: 'TechCorp Industries', phone: '+1-415-555-0101',
      jobTitle: 'CTO', serviceInterest: 'software_engineering',
      message: 'We need to rebuild our core operations platform. Looking for a long-term partner to handle architecture, development, and ongoing maintenance.',
      status: 'new', source: 'website_contact', assignedTo: manager._id,
    },
    {
      fullName: 'Michael Torres', email: 'm.torres@investgroup.com',
      companyName: 'InvestGroup Partners', phone: '+1-212-555-0102',
      jobTitle: 'Managing Director', serviceInterest: 'growth_intelligence',
      message: 'Interested in your analytics and business intelligence offerings. We want to move from spreadsheet-based reporting to real-time dashboards.',
      status: 'contacted', source: 'referral', assignedTo: manager._id,
    },
    {
      fullName: 'Sarah Kim', email: 's.kim@meridian.com',
      companyName: 'Meridian Healthcare', phone: '+1-312-555-0103',
      jobTitle: 'COO', serviceInterest: 'business_foundation',
      message: 'We\'re looking to automate our administrative workflows and integrate our disparate systems. Our team is spending too much time on manual processes.',
      status: 'qualified', source: 'website_service', assignedTo: staff._id,
    },
    {
      fullName: 'David Okafor', email: 'd.okafor@pulse.com',
      companyName: 'PulseCommerce Ltd', phone: '+1-310-555-0104',
      jobTitle: 'CEO', serviceInterest: 'software_engineering',
      message: 'Need a custom e-commerce tracking and analytics platform. Currently using off-the-shelf tools but need something purpose-built for our scale.',
      status: 'new', source: 'linkedin',
    },
    {
      fullName: 'Jennifer Walsh', email: 'j.walsh@summit.com',
      companyName: 'Summit Property Group', phone: '+1-617-555-0105',
      jobTitle: 'Head of Operations', serviceInterest: 'business_foundation',
      message: 'Looking for help streamlining our deal management and document workflows across our 12 offices.',
      status: 'proposal_sent', source: 'conference', assignedTo: manager._id,
    },
  ])

  console.log(`   ✔ ${leads.length} leads created`)

  // ── Clients ───────────────────────────────────────────────
  console.log('🏢 Creating clients...')

  const [client1, client2] = await Client.insertMany([
    {
      companyName: 'InvestCorp Group',
      industry: 'Financial Services',
      companySize: '201-500',
      website: 'https://investcorp.com',
      primaryContact: {
        name: 'Robert Martinez',
        email: 'r.martinez@investcorp.com',
        phone: '+1-212-555-0201',
        title: 'Managing Partner',
      },
      status: 'active',
      accountManager: manager._id,
      clientSince: new Date('2024-03-01'),
      tags: ['financial-services', 'enterprise'],
    },
    {
      companyName: 'PulseCommerce',
      industry: 'Retail & E-Commerce',
      companySize: '51-200',
      website: 'https://pulsecommerce.com',
      primaryContact: {
        name: 'Lisa Thompson',
        email: 'l.thompson@pulse.com',
        phone: '+1-310-555-0202',
        title: 'CTO',
      },
      status: 'active',
      accountManager: staff._id,
      clientSince: new Date('2023-11-01'),
      tags: ['retail', 'ecommerce', 'analytics'],
    },
  ])

  console.log(`   ✔ ${2} clients created`)

  // ── Projects ──────────────────────────────────────────────
  console.log('📁 Creating projects...')

  const projects = await Project.insertMany([
    {
      title: 'Core Operations Platform Rebuild',
      description: 'Complete architectural overhaul of the core business operations system. Migrating from legacy monolith to microservices-based architecture.',
      clientId: client1._id,
      type: 'software_engineering',
      status: 'active',
      priority: 'high',
      startDate: new Date('2025-02-01'),
      targetEndDate: new Date('2025-12-15'),
      projectManager: manager._id,
      teamMembers: [manager._id, staff._id],
      budget: { amount: 280000, currency: 'USD', type: 'fixed' },
      completionPercent: 65,
      milestones: [
        { title: 'Discovery & Architecture', status: 'completed', completedAt: new Date('2025-02-28') },
        { title: 'Phase 1: Core APIs', status: 'completed', completedAt: new Date('2025-05-30') },
        { title: 'Phase 2: Admin Dashboard', status: 'in_progress', dueDate: new Date('2025-09-30') },
        { title: 'Phase 3: Client Portal', status: 'pending', dueDate: new Date('2025-12-01') },
      ],
      tags: ['fintech', 'api', 'microservices'],
    },
    {
      title: 'Analytics & BI Dashboard',
      description: 'Real-time business intelligence dashboard with automated reporting and custom KPI tracking.',
      clientId: client2._id,
      type: 'growth_intelligence',
      status: 'active',
      priority: 'medium',
      startDate: new Date('2025-04-01'),
      targetEndDate: new Date('2025-11-30'),
      projectManager: staff._id,
      teamMembers: [staff._id],
      budget: { amount: 95000, currency: 'USD', type: 'retainer' },
      completionPercent: 82,
      tags: ['analytics', 'bi', 'dashboards'],
    },
  ])

  console.log(`   ✔ ${projects.length} projects created`)

  // ── Done ──────────────────────────────────────────────────
  console.log('\n✅ Seed complete.\n')
  console.log('─'.repeat(50))
  console.log('Platform ready for local development.')
  console.log(`Database: ${process.env.MONGODB_DB_NAME ?? 'aknexis'} (connected at ${uri})`)
  console.log('─'.repeat(50))

  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
