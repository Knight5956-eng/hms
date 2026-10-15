import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInvitationDto } from './dto/invitation.dto';
import * as crypto from 'crypto';

@Injectable()
export class InvitationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvitation(tenantId: string, invitedByUserId: string, dto: CreateInvitationDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 86400000 * 7); // 7 days

    const invitation = await this.prisma.invitation.create({
      data: {
        tenantId,
        email: dto.email.toLowerCase(),
        phone: dto.phone,
        role: dto.role,
        tokenHash,
        expiresAt,
        invitedBy: invitedByUserId,
      },
    });

    return { ...invitation, token }; // Returning token for test / email delivery
  }

  async findAllForTenant(tenantId: string) {
    return this.prisma.invitation.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
