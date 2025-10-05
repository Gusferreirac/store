import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.debug('Database connected');
    } catch (error) {
      this.logger.fatal(`Error connecting to database: ${error.message}`);
      try {
        await this.$connect();
        this.logger.debug('Database connected');
      } catch (error) {
        this.logger.fatal(`Error connecting to database: ${error.message}`);
      }
    }
  }
}
