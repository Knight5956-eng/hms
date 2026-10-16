import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PseudonymizationService } from './pseudonymization.service';
import { CsvExportService } from './csv-export.service';

@Injectable()
export class ExportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pseudoService: PseudonymizationService,
    private readonly csvService: CsvExportService,
  ) {}

  async generatePseudonymizedGlucoseExport(tenantId: string): Promise<string> {
    const readings = await this.prisma.glucoseReading.findMany({
      where: { tenantId },
      include: { patient: true },
      orderBy: { measuredAt: 'desc' },
    });

    const rows = readings.map((r) => ({
      pseudoPatientId: this.pseudoService.pseudonymizeId(r.patientId),
      glucoseMmol: r.value,
      context: r.context,
      measuredAt: r.measuredAt.toISOString(),
      source: r.source,
    }));

    return this.csvService.generateCsv(rows);
  }
}
