import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { ModuleName } from 'src/guards/module-name.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';

@ModuleName("RELATORIOS")
@Controller('relatorios')
export class RelatoriosController {
    constructor(private readonly relatoriosService: RelatoriosService) { }

    @Get('financas/total')
    @UseGuards(AuthGuard, PermissionGuard)
    async getTotalFinancas() {
        return this.relatoriosService.totalFinancas();
    }

    @Get('produtos/estoque')
    @UseGuards(AuthGuard, PermissionGuard)
    async getEstoqueProdutos() {
        return this.relatoriosService.estoqueProdutos();
    }

    @Get('acessos/recentes')
    @UseGuards(AuthGuard, PermissionGuard)
    async getAcessosRecentes(@Query('limit') limit?: number) {
        return this.relatoriosService.acessosRecentes(limit ? Number(limit) : 20);
    }
}
