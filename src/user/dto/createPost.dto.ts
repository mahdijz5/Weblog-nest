import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "src/entities";

export class CreatePostDto {
    @ApiProperty({
        type : String,
        description: "This is a required property",
        maxLength: 150
    })
    @IsNotEmpty()
    @IsString()
    @Length(0,150)
    title : string

    @ApiProperty({
        type: String,
        description: "This is a required property",
        maxLength: 2000
    })
    @IsNotEmpty()
    @IsString()
    @Length(0,2000)
    body : string
}