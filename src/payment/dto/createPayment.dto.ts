import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    @IsNumber()
    price : number 
}