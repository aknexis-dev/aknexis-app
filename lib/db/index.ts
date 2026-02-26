// ============================================================
// MODELS INDEX — Centralized model imports
// Always import models through this file to ensure
// they are registered before any query is executed.
// ============================================================

export { User }    from './models/User.model'
export { Lead }    from './models/Lead.model'
export { Client }  from './models/Client.model'
export { Project } from './models/Project.model'
export { File }    from './models/File.model'

export type { IUser }    from './models/User.model'
export type { ILead, LeadStatus, ServiceInterest, LeadSource } from './models/Lead.model'
export type { IClient, ClientStatus }    from './models/Client.model'
export type { IProject, ProjectStatus }  from './models/Project.model'
export type { IFile, FileCategory }      from './models/File.model'
