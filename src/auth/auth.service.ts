import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schema/user.schema';
import { generateRandomRef } from 'src/utils/generateRandom';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async getAllUser() {
        return await this.userModel.find().exec();
    }

    async createUser(createUserData: CreateUserDto) {
        const key = generateRandomRef();

        await this.userModel.create({
            usrid: key,
            username: createUserData.username,
            password: createUserData.password
        })

        return key;
    }

    async signup(signupData) {

    }

}
