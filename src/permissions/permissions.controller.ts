import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ModuleName } from 'src/guards/module-name.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/guards/roles.decorator';
import RolesUser from 'src/auth/enums/roles.enums';
import { CreatePermissionDto } from './dto/create-permission.dto';

@ModuleName('PERMISSOES')
@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    @Post()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }

    @Get()
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    findAll() {
        return this.permissionsService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    findOne(@Param("id") id: string) {
        return this.permissionsService.findById(+id);
    }

    @Delete(":id")
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    remove(@Param("id") id: string) {
        return this.permissionsService.remove(+id);
    }
}
