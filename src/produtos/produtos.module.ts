import { forwardRef, Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersPermissionsService } from 'src/users-permissions/users-permissions.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaService, UsersPermissionsService],
  exports: [ProdutosService]
})
export class ProdutosModule {}
