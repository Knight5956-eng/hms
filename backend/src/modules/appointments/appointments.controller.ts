import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './dto/appointment.dto';
import { CurrentTenant, Roles } from '../../common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles(Role.SUPER_ADMIN, Role.HOSPITAL_ADMIN, Role.DIABETOLOGIST, Role.DIABETES_NURSE_EDUCATOR)
  @Post()
  @ApiOperation({ summary: 'Schedule an appointment' })
  create(@CurrentTenant() tenantId: string, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.create(tenantId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all appointments for tenant' })
  findAll(@CurrentTenant() tenantId: string) {
    return this.appointmentsService.findAllForTenant(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment details by ID' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update appointment status' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAppointmentStatusDto) {
    return this.appointmentsService.updateStatus(id, dto);
  }
}
