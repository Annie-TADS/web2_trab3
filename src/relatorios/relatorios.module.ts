import { forwardRef, Module } from '@nestjs/common';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from './relatorios.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { EndpointAccessesModule } from 'src/endpoint-accesses/endpoint-accesses.module';
import { UsersPermissionsService } from 'src/users-permissions/users-permissions.service';

@Module({
  imports: [forwardRef(() => AuthModule), EndpointAccessesModule],
  controllers: [RelatoriosController],
  providers: [RelatoriosService, PrismaService, UsersPermissionsService],
})
export class RelatoriosModule {}
