import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      console.log('Connecting to database...');
      await this.$connect();
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Failed to connect to database:', error);
      console.warn('⚠️ App will continue to start. Database connection will be retried on first query.');
      // Don't throw - let the app start even if DB connection fails
      // Prisma will retry the connection on the first query
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
