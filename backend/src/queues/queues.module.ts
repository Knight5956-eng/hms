import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefillRemindersProcessor } from './refill-reminders.processor';
import { AppointmentRemindersProcessor } from './appointment-reminders.processor';
import { RiskRecalculationProcessor } from './risk-recalculation.processor';
import { ExportJobsProcessor } from './export-jobs.processor';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL') || configService.get<string>('app.redisUrl');
        if (redisUrl) {
          const url = new URL(redisUrl);
          return {
            connection: {
              host: url.hostname,
              port: parseInt(url.port || '6379', 10),
              password: url.password || undefined,
            },
          };
        }
        return {
          connection: {
            host: 'localhost',
            port: 6379,
          },
        };
      },
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      { name: 'refill-reminders' },
      { name: 'appointment-reminders' },
      { name: 'risk-recalculation' },
      { name: 'export-jobs' },
    ),
  ],
  providers: [
    RefillRemindersProcessor,
    AppointmentRemindersProcessor,
    RiskRecalculationProcessor,
    ExportJobsProcessor,
  ],
})
export class QueuesModule {}
