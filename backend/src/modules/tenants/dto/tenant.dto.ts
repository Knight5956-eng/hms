import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsArray } from 'class-validator';
import { TenantStatus } from '@prisma/client';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(TenantStatus)
  @IsOptional()
  status?: TenantStatus;
}

export class UpdateTenantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(TenantStatus)
  @IsOptional()
  status?: TenantStatus;
}

export class UpdateTenantSettingsDto {
  @IsString()
  @IsOptional()
  glucoseUnits?: string;

  @IsString()
  @IsOptional()
  pharmacyContact?: string;

  @IsArray()
  @IsOptional()
  refillReminderOffsets?: number[];

  @IsNumber()
  @IsOptional()
  critHypoThreshold?: number;

  @IsNumber()
  @IsOptional()
  critHyperThreshold?: number;

  @IsNumber()
  @IsOptional()
  critHba1cThreshold?: number;

  @IsNumber()
  @IsOptional()
  highHba1cMin?: number;

  @IsNumber()
  @IsOptional()
  modHba1cMin?: number;
}
