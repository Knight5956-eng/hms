import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRefillRequestDto, UpdateRefillStatusDto } from './dto/refill.dto';

@Injectable()
export class RefillsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, patientId: string, dto: CreateRefillRequestDto) {
    const medication = await this.prisma.medication.findUnique({ where: { id: dto.medicationId } });
    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    return this.prisma.refillRequest.create({
      data: {
        tenantId,
        patientId,
        medicationId: dto.medicationId,
        notes: dto.notes,
        status: 'PENDING',
      },
      include: { medication: true },
    });
  }

  async findAllForTenant(tenantId: string) {
    return this.prisma.refillRequest.findMany({
      where: { tenantId },
      include: {
        medication: true,
        patient: { include: { user: { select: { firstName: true, lastName: true, phone: true } } } },
      },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async updateStatus(id: string, dto: UpdateRefillStatusDto) {
    return this.prisma.refillRequest.update({
      where: { id },
      data: {
        status: dto.status,
        fulfilledAt: dto.status === 'FULFILLED' ? new Date() : null,
      },
    });
  }
}
