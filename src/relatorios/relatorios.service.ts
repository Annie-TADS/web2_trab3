import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RelatoriosService {
    constructor(private readonly prisma: PrismaService) { }

    async totalFinancas() {
        return this.prisma.financas.aggregate({
            _sum: {
                valor: true,
            },
        });
    }

    async estoqueProdutos() {
        return this.prisma.produtos.findMany({
            select: {
                nome: true,
                preco: true,
                estoque: true,
                criadoEm: true,
            },
            orderBy: {
                estoque: 'asc',
            },
        });
    }

    async acessosRecentes(limit = 20) {
        return this.prisma.endpointAccesses.findMany({
            take: limit,
            orderBy: {
                dateTime: 'desc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
    }
}
