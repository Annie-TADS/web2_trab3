import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEndpointAccessDto } from './dto/create-user.dto';

@Injectable()
export class EndpointAccessesService {
    constructor(private prisma: PrismaService) {}
    
    async create(createEndpointAccessDto: CreateEndpointAccessDto) {
        return this.prisma.endpointAccesses.create({
            data: createEndpointAccessDto
        })
    }
}
