import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ModuleName } from 'src/guards/module-name.decorator';
import { UsersPermissionsService } from './users-permissions.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import RolesUser from 'src/auth/enums/roles.enums';
import { Roles } from 'src/guards/roles.decorator';

@ModuleName("PERMISSOES")
@Controller('users-permissions')
export class UsersPermissionsController {
    constructor(private readonly usersPermissionsService: UsersPermissionsService) { }

    @Patch(":userId/:permissionId")
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    create(  
        @Param('userId') userId: string,
        @Param('permissionId') permissionId: string
    ) {
        return this.usersPermissionsService.grant(+userId, +permissionId);
    }

    @Get(":userId")
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    findAll(@Param('userId') userId: string) {
        return this.usersPermissionsService.findByUser(+userId);
    }

    @Delete(":id")
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(RolesUser.SUPERUSER, RolesUser.ADMIN)
    remove(@Param("id") id: string) {
        return this.usersPermissionsService.remove(+id);
    }
}
