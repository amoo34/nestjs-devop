import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['error', 'warn'],
      errorFormat: 'minimal',
    });
  }

  async onModuleInit() {
    // Don't connect on startup - let Prisma connect lazily on first query
    // This allows the app to start faster and pass Cloud Run's health check
    this.logger.log('PrismaService initialized. Database will connect on first query.');
    
    // Validate DATABASE_URL is set (but don't connect yet)
    if (!process.env.DATABASE_URL) {
      this.logger.warn('DATABASE_URL is not set. Database operations will fail.');
    } else {
      this.logger.log('DATABASE_URL is configured.');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('PrismaService disconnected from database.');
    } catch (error) {
      this.logger.error('Error disconnecting from database:', error);
    }
  }
}
