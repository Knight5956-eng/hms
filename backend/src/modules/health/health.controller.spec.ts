import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('HealthController and HealthService', () => {
  let controller: HealthController;
  let service: HealthService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'NODE_ENV') return 'test';
      if (key === 'REDIS_URL') return undefined;
      return undefined;
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('HealthService.checkHealth', () => {
    it('should return healthy status when database is up', async () => {
      mockPrismaService.$queryRaw.mockResolvedValueOnce([{ '?column?': 1 }]);

      const result = await service.checkHealth();

      expect(result.isHealthy).toBe(true);
      expect(result.response.status).toBe('ok');
      expect(result.response.checks.database.status).toBe('up');
      expect(result.response.checks.redis.status).toBe('disabled');
      expect(result.response.environment).toBe('test');
      expect(result.response.uptime).toBeGreaterThanOrEqual(0);
      expect(result.response.timestamp).toBeDefined();
    });

    it('should return error status when database fails', async () => {
      mockPrismaService.$queryRaw.mockRejectedValueOnce(new Error('Connection refused'));

      const result = await service.checkHealth();

      expect(result.isHealthy).toBe(false);
      expect(result.response.status).toBe('error');
      expect(result.response.checks.database.status).toBe('down');
      expect(result.response.checks.database.message).toBe('Connection refused');
    });
  });

  describe('HealthController.checkHealth', () => {
    it('should respond with HTTP 200 when healthy', async () => {
      mockPrismaService.$queryRaw.mockResolvedValueOnce([{ '?column?': 1 }]);

      const mockResponseJson = jest.fn();
      const mockResponseStatus = jest.fn().mockReturnValue({ json: mockResponseJson });
      const mockRes = { status: mockResponseStatus } as unknown as Response;

      await controller.checkHealth(mockRes);

      expect(mockResponseStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'ok',
        }),
      );
    });

    it('should respond with HTTP 503 when database is down', async () => {
      mockPrismaService.$queryRaw.mockRejectedValueOnce(new Error('DB Down'));

      const mockResponseJson = jest.fn();
      const mockResponseStatus = jest.fn().mockReturnValue({ json: mockResponseJson });
      const mockRes = { status: mockResponseStatus } as unknown as Response;

      await controller.checkHealth(mockRes);

      expect(mockResponseStatus).toHaveBeenCalledWith(HttpStatus.SERVICE_UNAVAILABLE);
      expect(mockResponseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
        }),
      );
    });
  });
});
