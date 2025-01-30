import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get('/all')
    @UseGuards(AuthGuard())
    async getAllUser() {
        return await this.authService.getAllUser();
    }

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto) {        
        return await this.authService.createUser(createUserDto);
    }

    @Post('/login')
    async loginUser(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
}
