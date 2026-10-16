import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportsService } from './exports.service';
import { CurrentTenant, Roles } from '../../common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('exports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('exports')
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Roles(Role.SUPER_ADMIN, Role.HOSPITAL_ADMIN, Role.DIABETOLOGIST)
  @Get('glucose/csv')
  @ApiOperation({ summary: 'Export pseudonymized glucose dataset (CSV)' })
  async exportGlucoseCsv(@CurrentTenant() tenantId: string, @Res() res: Response) {
    const csvContent = await this.exportsService.generatePseudonymizedGlucoseExport(tenantId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="glucose-export-${Date.now()}.csv"`);
    res.send(csvContent);
  }
}
