import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientProfileDto, AssignClinicianDto } from './dto/patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(tenantId: string, dto: CreatePatientProfileDto) {
    return this.prisma.patientProfile.create({
      data: {
        tenantId,
        userId: dto.userId,
        dateOfBirth: new Date(dto.dateOfBirth),
        sex: dto.sex,
        diagnosisDate: dto.diagnosisDate ? new Date(dto.diagnosisDate) : null,
        assignedClinicianId: dto.assignedClinicianId || null,
      },
      include: { user: true, assignedClinician: { include: { user: true } } },
    });
  }

  async findAllForTenant(tenantId: string) {
    return this.prisma.patientProfile.findMany({
      where: { tenantId },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        assignedClinician: { include: { user: { select: { firstName: true, lastName: true } } } },
        riskAssessments: { orderBy: { computedAt: 'desc' }, take: 1 },
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        assignedClinician: { include: { user: true } },
        glucoseReadings: { orderBy: { measuredAt: 'desc' }, take: 10 },
        hba1cResults: { orderBy: { resultDate: 'desc' }, take: 5 },
        medications: { include: { schedules: true } },
        riskAssessments: { orderBy: { computedAt: 'desc' }, take: 1 },
      },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async findByUserId(userId: string) {
    const patient = await this.prisma.patientProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        assignedClinician: { include: { user: true } },
      },
    });
    if (!patient) {
      throw new NotFoundException('Patient profile not found for user');
    }
    return patient;
  }

  async assignClinician(patientId: string, dto: AssignClinicianDto) {
    await this.findOne(patientId);
    return this.prisma.patientProfile.update({
      where: { id: patientId },
      data: { assignedClinicianId: dto.clinicianId },
      include: { assignedClinician: { include: { user: true } } },
    });
  }
}
