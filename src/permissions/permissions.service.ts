import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createPermissionDto: CreatePermissionDto) {
        return this.prisma.permissions.create({ data: createPermissionDto });
    }
    
    findAll() {
        return this.prisma.permissions.findMany();
    }

    findById(id: number) {
        return this.prisma.permissions.findUnique({
            where: {
                id
            },
        });
    }

    remove(id: number) {
        if (!this.findById(id)) {
            return null;
        }
        
        return this.prisma.permissions.delete({
            where: { id }
        });
    }
}
