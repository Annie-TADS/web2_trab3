import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    
    async login(loginDto: LoginDto) {
        console.log({loginDto})
        if (!loginDto || !loginDto.username || !loginDto.password) {
            throw new BadRequestException('')
        }
        
        const user = await this.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            return null;
        }

        return this.getToken(user);
    }

    private async validateUser(username: string, password: string) {
        const user = await this.usersService.findByUsername(username, true);
        console.log({user})
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        return null
    }
    
    private async getToken(user: any) {
        const payload = { username: user.name, id: user.id, admin: user.admin, superUser: user.superUser }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async not_allowed(module: string) {
        return `SEM PERMISSÃO PARA ACESSAR O MÓDULO ${module}`
    }
}
