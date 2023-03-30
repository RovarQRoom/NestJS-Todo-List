import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class CreateUserDto {
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

export class GetUsersDto {
    @IsNotEmpty()
    FirstName: string;

    @IsNotEmpty()
    LastName: string;

    @IsEmail()
    @IsNotEmpty()
    Email: string;

    @IsPhoneNumber("IQ")
    Phone: string;
}