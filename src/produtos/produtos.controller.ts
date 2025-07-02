import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, ValidationPipe } from '@nestjs/common';
import { ModuleName } from 'src/guards/module-name.decorator';
import { ProdutosService } from './produtos.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { FileUpload } from 'src/interceptors/file-upload.interceptor';

@ModuleName("PRODUTOS")
@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) { }

    @Post()
    @UseGuards(AuthGuard, PermissionGuard)
    @FileUpload()
    async create(
        @Body(new ValidationPipe({ whitelist: true })) createProdutoDto: CreateProdutoDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const imagemUrl = file?.path;
        return this.produtosService.create({
            nome: createProdutoDto.nome,
            preco: parseFloat(`${createProdutoDto.preco}`),
            estoque: parseInt(`${createProdutoDto.estoque}`, 10),
            imagemUrl,
        });
    }

    @Get()
    @UseGuards(AuthGuard, PermissionGuard)
    findAll() {
        return this.produtosService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard, PermissionGuard)
    findOne(@Param("id") id: string) {
        return this.produtosService.findById(+id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard, PermissionGuard)
    @FileUpload()
    update(@Param("id") id: string, @Body() updateProdutoDto: UpdateProdutoDto, @UploadedFile() file?: Express.Multer.File) {
        const imagemUrl = file?.path;

        return this.produtosService.update(+id, {
            ...(updateProdutoDto.nome && { nome: updateProdutoDto.nome }),
            ...(updateProdutoDto.preco && { preco: parseFloat(`${updateProdutoDto.preco}`) }),
            ...(updateProdutoDto.estoque && { estoque: parseInt(`${updateProdutoDto.estoque}`, 10) }),
            ...(imagemUrl && { imagemUrl }),
        });
    }

    @Delete(":id")
    @UseGuards(AuthGuard, PermissionGuard)
    remove(@Param("id") id: string) {
        return this.produtosService.remove(+id);
    }
}

