import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get('/all')
    async getAllUser() {
        return await this.authService.getAllUser();
    }

    @Post('/create')
    async createUser(@Body() createUserDto) {        
        return await this.authService.createUser(createUserDto);
    }
}
