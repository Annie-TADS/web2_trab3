import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EndpointAccessesController } from './endpoint-accesses/endpoint-accesses.controller';
import { EndpointAccessesModule } from './endpoint-accesses/endpoint-accesses.module';
import { UsersPermissionsController } from './users-permissions/users-permissions.controller';
import { UsersPermissionsModule } from './users-permissions/users-permissions.module';
import { EndpointAccessesService } from './endpoint-accesses/endpoint-accesses.service';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { PrismaService } from './prisma.service';
import { EndpointSuccessInterceptor } from './interceptors/endpoint-success.interceptor';
import { PermissionsController } from './permissions/permissions.controller';
import { FinancasController } from './financas/financas.controller';
import { ProdutosController } from './produtos/produtos.controller';
import { FinancasModule } from './financas/financas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [AuthModule, UsersModule, PermissionsModule, EndpointAccessesModule, UsersPermissionsModule, FinancasModule, ProdutosModule, RelatoriosModule],
  controllers: [AppController, EndpointAccessesController, UsersPermissionsController, PermissionsController, FinancasController, ProdutosController],
  providers: [
    AppService,
    EndpointAccessesService,
    Reflector,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: EndpointSuccessInterceptor,
    },
  ],
})
export class AppModule {}