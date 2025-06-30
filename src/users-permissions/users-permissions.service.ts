import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersPermissionsService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    grant(userId: number, permissionId: number) {
        return this.prisma.usersPermissions.create({ data: {
            userId,
            permissionId
        } });
    }
    
    findByUser(userId: number) {
        return this.prisma.usersPermissions.findMany({
            where: {
                userId
            },
            select: {
                permissions: true
            }
        });
    }

    remove(id: number) {
        return this.prisma.usersPermissions.delete({
            where: { id }
        });
    }}
