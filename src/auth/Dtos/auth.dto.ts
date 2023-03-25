import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class SigninAuthDto {

    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsNotEmpty()
    Password: string;
}

export class SignUpAuthDto {
    @IsNotEmpty()
    FirstName: string;

    @IsNotEmpty()
    LastName: string;

    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsPhoneNumber("IQ")
    Phone: string;

    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;
}