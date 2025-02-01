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

  // Getting all user
  async getAllUser() {
    return await this.userModel.find().exec();
  }

  // Creating user
  async createUser(createUserData: CreateUserDto) {
    //Generating random ref for usrid and hashing the pass
    const usr_id = generateRandomRef();
    const hashedPassword = await bcrypt.hash(createUserData.password, 10);

    await this.userModel.create({
      usrid: usr_id,
      username: createUserData.username,
      password: hashedPassword,
    });

    return usr_id;
  }

  // Login user
  async login(loginData: LoginDto) {
    const { usrid, password } = loginData;
    //Checking if user didn't exist
    const user = await this.userModel.findOne({ usrid });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    //Matching password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const access_token = await this.jwtService.sign({
      id: user._id,
    });

    return { token: access_token };
  }
}
