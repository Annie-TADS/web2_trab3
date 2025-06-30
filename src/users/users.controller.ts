import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { SameGuard } from 'src/guards/same.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import RolesUser from 'src/auth/enums/roles.enums';
import { UpdateUserDto } from './dto/update-user.dto';
import { ModuleName } from 'src/guards/module-name.decorator';

@ModuleName('USUARIOS')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('admin')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER)
    createAdmin(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createAdmin(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard, PermissionGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard, SameGuard)
    findOne(@Param("id") id: string) {
        return this.usersService.findById(+id);
    }

    @Patch(":id")
    @UseGuards(AuthGuard, SameGuard)
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(":id")
    @UseGuards(AuthGuard, SameGuard)
    remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}
