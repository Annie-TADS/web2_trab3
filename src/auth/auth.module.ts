import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UsersPermissionsService } from 'src/users-permissions/users-permissions.service';

@Module({
  imports: [JwtModule.register({ secret: "super_secret_secret" })],
  providers: [AuthService, UsersService, PrismaService, UsersPermissionsService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
