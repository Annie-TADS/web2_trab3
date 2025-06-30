import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [JwtModule.register({ secret: "super_secret_secret" })],
  providers: [AuthService, UsersService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
