import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    create(createUserDto: CreateUserDto) {
        return this.prisma.users.create({ data: {...createUserDto, admin: false, superUser: false} });
    }

    createAdmin(createUserDto: CreateUserDto) {
        return this.prisma.users.create({ data: {...createUserDto, admin: true, superUser: false} });
    }

    findAll() {
        return this.prisma.users.findMany();
    }

    findById(id: number) {
        return this.prisma.users.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            admin: true,
            superUser: true,
            permissions: true
        },
        });
    }

    findByUsername(username:string, includePassword: boolean = false) {
        return this.prisma.users.findFirst({
            where: {
                username,
            },
            select: {
                id: true,
                username: true,
                password: includePassword,
                admin: true,
                superUser: true,
                permissions: true
            },
        });
    }  

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.users.update({
            where: { id },
            data: updateUserDto
        });
    }

    remove(id: number) {
        return this.prisma.users.delete({
            where: { id }
        });
    }
}
