import { Module } from '@nestjs/common';
import { ExportsController } from './exports.controller';
import { ExportsService } from './exports.service';
import { PseudonymizationService } from './pseudonymization.service';
import { CsvExportService } from './csv-export.service';

@Module({
  controllers: [ExportsController],
  providers: [ExportsService, PseudonymizationService, CsvExportService],
  exports: [ExportsService],
})
export class ExportsModule {}
