import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
    constructor(private prisma: PrismaService) {}

    create(createProdutoDto: CreateProdutoDto) {
        return this.prisma.produtos.create({ data: createProdutoDto });
    }

    findAll() {
        return this.prisma.produtos.findMany();
    }

    findById(id: number) {
        return this.prisma.produtos.findUnique({
            where: {
                id
            },
        });
    }

    update(id: number, updateProdutoDto: UpdateProdutoDto) {
        if (!this.findById(id)) {
            return null;
        }

        return this.prisma.produtos.update({
            where: { id },
            data: updateProdutoDto
        });
    }

    remove(id: number) {
        if (!this.findById(id)) {
            return null;
        }
        
        return this.prisma.produtos.delete({
            where: { id }
        });
    }
}
