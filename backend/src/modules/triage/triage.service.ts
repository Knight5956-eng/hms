import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { evaluatePatientRisk } from './risk-rules.engine';
import { DEFAULT_RISK_THRESHOLDS } from './risk-rules.defaults';

@Injectable()
export class TriageService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateAndSaveRisk(tenantId: string, patientId: string) {
    const tenantSettings = await this.prisma.tenantSettings.findUnique({ where: { tenantId } });
    const thresholds = tenantSettings
      ? {
          critHypoThreshold: tenantSettings.critHypoThreshold,
          critHyperThreshold: tenantSettings.critHyperThreshold,
          critHba1cThreshold: tenantSettings.critHba1cThreshold,
          highHba1cMin: tenantSettings.highHba1cMin,
          modHba1cMin: tenantSettings.modHba1cMin,
        }
      : DEFAULT_RISK_THRESHOLDS;

    const glucoseReadings = await this.prisma.glucoseReading.findMany({
      where: { patientId },
      orderBy: { measuredAt: 'desc' },
      take: 30,
    });

    const hba1cResults = await this.prisma.hba1cResult.findMany({
      where: { patientId },
      orderBy: { resultDate: 'desc' },
      take: 5,
    });

    const result = evaluatePatientRisk({ glucoseReadings, hba1cResults }, thresholds);

    return this.prisma.riskAssessment.create({
      data: {
        tenantId,
        patientId,
        tier: result.tier,
        reasons: result.reasons,
      },
    });
  }

  async getCohortTriage(tenantId: string) {
    const patients = await this.prisma.patientProfile.findMany({
      where: { tenantId },
      include: {
        user: { select: { firstName: true, lastName: true } },
        riskAssessments: { orderBy: { computedAt: 'desc' }, take: 1 },
      },
    });

    return patients.map((p) => ({
      patientId: p.id,
      patientName: `${p.user.firstName} ${p.user.lastName}`,
      latestRisk: p.riskAssessments[0] || null,
    }));
  }
}
