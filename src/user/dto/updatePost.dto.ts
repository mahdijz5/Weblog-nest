import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { User } from "src/entities";

export class UpdatePostDto {
    @ApiProperty({
        type: String,
        description: "This is not a required property",
        maxLength: 150,
        required : false
    })
    @IsOptional()
    @IsString()
    @Length(0, 150)
    title: string

    @ApiProperty({
        type: String,
        description: "This is not a required property",
        maxLength: 2000,
        required: false
    })
    @IsOptional()
    @IsString()
    @Length(0, 2000)
    body: string
}