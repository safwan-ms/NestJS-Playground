import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(this: PrismaClient) {
    await this.prisma.$connect();
  }

  async onModuleDestroy(this: PrismaClient) {
    await this.$disconnect();
  }
}
