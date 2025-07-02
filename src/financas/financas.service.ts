import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFinancaDto } from './dto/create-financa.dto';
import { UpdateFinancaDto } from './dto/update-financa.dto';

@Injectable()
export class FinancasService {
    constructor(private prisma: PrismaService) {}

    create(createFinancaDto: CreateFinancaDto) {
        return this.prisma.financas.create({ data: createFinancaDto });
    }

    findAll() {
        return this.prisma.financas.findMany();
    }

    findById(id: number) {
        return this.prisma.financas.findUnique({
            where: {
                id
            },
        });
    }

    update(id: number, updateFinancaDto: UpdateFinancaDto) {
        if (!this.findById(id)) {
            return null;
        }
        
        return this.prisma.financas.update({
            where: { id },
            data: updateFinancaDto
        });
    }

    remove(id: number) {
        if (!this.findById(id)) {
            return null;
        }
        
        return this.prisma.financas.delete({
            where: { id }
        });
    }
}
