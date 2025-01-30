import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/schema/user.schema';
import { generateRandomRef } from 'src/utils/generateRandom';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async getAllUser() {
        return await this.userModel.find().exec();
    }

    async createUser(createUserData: CreateUserDto) {
        const key = generateRandomRef();
        const hashedPassword = await bcrypt.hash(createUserData.password, 10);

        await this.userModel.create({
            usrid: key,
            username: createUserData.username,
            password: hashedPassword
        })

        return key;
    }

    async login(loginData: LoginDto) {
        const { usrid, password } = loginData;
        const user = await this.userModel.findOne({ usrid });

        if(!user) {
            throw new UnauthorizedException("User not found !");
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);

        if(!isPasswordMatched) {
            throw new UnauthorizedException("Invalid password");
        }

        const access_token = await this.jwtService.sign({
            id: user._id
        })

        return { token: access_token }
    }

}
