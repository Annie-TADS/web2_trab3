import { forwardRef, Module } from '@nestjs/common';
import { FinancasService } from './financas.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { UsersPermissionsService } from 'src/users-permissions/users-permissions.service';
import { FinancasController } from './financas.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [FinancasController],
  providers: [FinancasService, PrismaService, UsersPermissionsService],
  exports: [FinancasService]
})
export class FinancasModule {}
