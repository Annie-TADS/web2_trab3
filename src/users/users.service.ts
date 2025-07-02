import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { UsersPermissionsService } from 'src/users-permissions/users-permissions.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersPermissaoService: UsersPermissionsService
    ) {}

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        
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
                id,
                active: true
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
                active: true
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

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (!this.findById(id)) {
            return null;
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        
        return this.prisma.users.update({
            where: { id },
            data: updateUserDto
        });
    }

    async remove(id: number) {
        if (!this.findById(id)) {
            return null;
        }

        const permissoes = await this.usersPermissaoService.findByUser(id);
        permissoes.forEach(async permissao => {
            await this.usersPermissaoService.remove(permissao.id)
        });
        
        return this.prisma.users.update({
            where: { id },
            data: {
                active: false
            }
        });
    }
}
