import { forwardRef, Module } from '@nestjs/common';
import { UsersPermissionsService } from './users-permissions.service';
import { PrismaService } from 'src/prisma.service';
import { UsersPermissionsController } from './users-permissions.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersPermissionsService, PrismaService],
  controllers: [UsersPermissionsController],
  exports: [UsersPermissionsService]
})
export class UsersPermissionsModule {}
