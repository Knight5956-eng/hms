export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HOSPITAL_ADMIN = 'HOSPITAL_ADMIN',
  DIABETOLOGIST = 'DIABETOLOGIST',
  NURSE_EDUCATOR = 'NURSE_EDUCATOR',
  NUTRITIONIST = 'NUTRITIONIST',
  PATIENT = 'PATIENT',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId?: string | null;
  phoneNumber?: string;
  isActive: boolean;
  mfaEnabled?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  tokens?: AuthTokens;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  settings?: TenantSettings;
  createdAt: string;
}

export interface TenantSettings {
  glucoseUnit: 'MMOL_L' | 'MG_DL';
  criticalLowThreshold: number;
  criticalHighThreshold: number;
  targetRangeMin: number;
  targetRangeMax: number;
  pharmacyContact?: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  user: User;
  tenantId: string;
  dateOfBirth?: string;
  sex?: string;
  diagnosisDate?: string;
  assignedClinicianId?: string;
  assignedClinician?: {
    id: string;
    user: User;
  };
}

export enum GlucoseContext {
  FASTING = 'FASTING',
  BEFORE_MEAL = 'BEFORE_MEAL',
  AFTER_MEAL = 'AFTER_MEAL',
  BEDTIME = 'BEDTIME',
  RANDOM = 'RANDOM',
}

export enum GlucoseStatus {
  LOW = 'LOW',
  IN_RANGE = 'IN_RANGE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export interface GlucoseReading {
  id: string;
  patientId: string;
  value: number; // stored canonically in mmol/L
  context: GlucoseContext;
  measuredAt: string;
  notes?: string;
  status?: GlucoseStatus;
}

export interface Hba1cResult {
  id: string;
  patientId: string;
  value: number; // percentage %
  resultDate: string;
  recordedBy?: string;
  notes?: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  quantityDispensed: number;
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export enum RefillStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DISPENSED = 'DISPENSED',
  REJECTED = 'REJECTED',
}

export interface RefillRequest {
  id: string;
  medicationId: string;
  medication?: Medication;
  patientId: string;
  status: RefillStatus;
  requestedAt: string;
  fulfilledAt?: string;
  notes?: string;
}

export enum AppointmentMode {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  IN_PERSON = 'IN_PERSON',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Appointment {
  id: string;
  patientId: string;
  patientUser?: User;
  clinicianId: string;
  clinicianUser?: User;
  scheduledAt: string;
  mode: AppointmentMode;
  status: AppointmentStatus;
  notes?: string;
}

export enum RiskTier {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
}

export interface RiskAssessment {
  id: string;
  patientId: string;
  tier: RiskTier;
  reasons: string[];
  computedAt: string;
}

export interface TelemedicineSession {
  sessionId: string;
  appointmentId: string;
  mode: AppointmentMode;
  status: 'WAITING' | 'ACTIVE' | 'ENDED';
  turnCredentials?: Record<string, unknown>;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  ipAddress?: string;
  timestamp: string;
  details?: Record<string, unknown>;
}
