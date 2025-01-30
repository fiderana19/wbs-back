import { IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    usrid: string;

    @IsNotEmpty()
    password: string;
}