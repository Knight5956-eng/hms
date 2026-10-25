import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RecordVitalsDto } from './dto/telemedicine.dto';

@Injectable()
export class CallSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async startSession(sessionId: string) {
    return this.prisma.callSession.update({
      where: { id: sessionId },
      data: { startedAt: new Date() },
    });
  }

  async endSession(sessionId: string, qualityStats?: any) {
    return this.prisma.callSession.update({
      where: { id: sessionId },
      data: {
        endedAt: new Date(),
        qualityStats: qualityStats || undefined,
      },
    });
  }

  async recordVitals(sessionId: string, dto: RecordVitalsDto) {
    return this.prisma.vitalsSnapshot.upsert({
      where: { callSessionId: sessionId },
      update: dto,
      create: {
        callSessionId: sessionId,
        ...dto,
      },
    });
  }
}
