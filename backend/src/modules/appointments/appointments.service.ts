import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateAppointmentDto) {
    const appointment = await this.prisma.appointment.create({
      data: {
        tenantId,
        patientId: dto.patientId,
        clinicianId: dto.clinicianId,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        mode: dto.mode || 'VIDEO',
        reason: dto.reason,
      },
      include: {
        patient: { include: { user: true } },
        clinician: { include: { user: true } },
      },
    });

    // Create CallSession for video/audio appointments
    await this.prisma.callSession.create({
      data: {
        appointmentId: appointment.id,
        modeUsed: dto.mode || 'VIDEO',
      },
    });

    return appointment;
  }

  async findAllForTenant(tenantId: string) {
    return this.prisma.appointment.findMany({
      where: { tenantId },
      include: {
        patient: { include: { user: { select: { firstName: true, lastName: true } } } },
        clinician: { include: { user: { select: { firstName: true, lastName: true } } } },
        callSession: true,
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: { include: { user: true } },
        clinician: { include: { user: true } },
        callSession: { include: { vitalsSnapshot: true } },
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async updateStatus(id: string, dto: UpdateAppointmentStatusDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}
