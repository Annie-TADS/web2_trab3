import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { EndpointAccessesModule } from 'src/endpoint-accesses/endpoint-accesses.module';
import { UsersPermissionsService } from 'src/users-permissions/users-permissions.service';

@Module({
  imports: [forwardRef(() => AuthModule), EndpointAccessesModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersPermissionsService],
  exports: [UsersService],
})
export class UsersModule {}