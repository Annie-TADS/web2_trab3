import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ModuleName } from 'src/guards/module-name.decorator';
import { FinancasService } from './financas.service';
import { PermissionGuard } from 'src/guards/permission.guard';
import { CreateFinancaDto } from './dto/create-financa.dto';
import { UpdateFinancaDto } from './dto/update-financa.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ModuleName('FINANCAS')
@Controller('financas')
export class FinancasController {
    constructor(private readonly financasService: FinancasService) { }

    @Post()
    @UseGuards(AuthGuard, PermissionGuard)
    create(@Body() createFinancaDto: CreateFinancaDto) {
        return this.financasService.create(createFinancaDto);
    }

    @Get()
    @UseGuards(AuthGuard, PermissionGuard)
    findAll() {
        return this.financasService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard, PermissionGuard)
    findOne(@Param("id") id: string) {
        return this.financasService.findById(+id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard, PermissionGuard)
    update(@Param("id") id: string, @Body() updateFinancaDto: UpdateFinancaDto) {
        return this.financasService.update(+id, updateFinancaDto);
    }

    @Delete(":id")
    @UseGuards(AuthGuard, PermissionGuard)
    remove(@Param("id") id: string) {
        return this.financasService.remove(+id);
    }
}
