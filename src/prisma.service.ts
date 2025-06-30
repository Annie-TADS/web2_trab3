import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma";
import * as bcrypt from 'bcrypt'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.ensureSuperUserExists();
  }

  private async ensureSuperUserExists() {
    const existing = await this.users.findFirst({
      where: {
        superUser: true,
      },
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await this.users.create({
        data: {
          username: 'admin',
          password: hashedPassword,
          superUser: true,
          admin: true,
        },
      });
    }
  }
}