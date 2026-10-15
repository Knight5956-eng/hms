import { IsString, IsOptional, IsEnum } from 'class-validator';
import { AccountStatus, Role } from '@prisma/client';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(AccountStatus)
  @IsOptional()
  status?: AccountStatus;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
