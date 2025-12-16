import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Don't connect on startup - let Prisma connect lazily on first query
    // This allows the app to start faster and pass Cloud Run's health check
    console.log('PrismaService initialized. Database will connect on first query.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
