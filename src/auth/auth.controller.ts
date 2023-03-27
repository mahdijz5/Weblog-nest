import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto ,ForgotPasswordDto, ResetPasswordDto} from './dto';
import { Request , Response} from 'express';
import { BadRequestException, Body, Controller, Get, Post, Res, Req, UseGuards, Param, Put, ParseIntPipe } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthorizedRequest } from '../interfaces';
import { LocalGuard } from "./guards/local.guard"
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @ApiCreatedResponse({ description: 'User has been created successfully.' })
    @ApiBadRequestResponse({ description: 'User already exists' })
    @Post(("register"))
    async register(@Body() body: CreateUserDto,@Res() res : Response ) {
        try {
            if (body.password !== body.confirmPassword) new BadRequestException({ "message": "Confirm password is incorrect." })
            await this.authService.createUser(body)
            res.status(201).json({'message' : "User has been created successfully."})
        } catch (error) {
            throw error
        }
    }

    @ApiBadRequestResponse({ description: "User doesn't exists" })
    @ApiOkResponse({ description: 'Your authorized' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @Post(("login"))
    @UseGuards(LocalGuard)
    login(@Body() body: LoginUserDto, @Req() req: AuthorizedRequest, @Res() res: Response) {
        res.status(200).json({ "message": "Your authorized",...this.authService.generateToken(req.user) })
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Your authorized' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
    @Post('auth')
    @UseGuards(JwtGuard)
    auth(@Req() req: AuthorizedRequest,@Res() res : Response) {
        res.status(200).json({"message" : "You are athorized","user" : req.user})
    }
    
    @ApiOkResponse({ description: 'Email has been sent' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
    @Post('forgot-password')
    async forgotPassword(@Req() req: Request, @Body() body: ForgotPasswordDto, @Res() res: Response ){
        const data = await this.authService.validateEmailToChangePassword(body)
        res.status(200).json(data)
    }

    @ApiOkResponse({ description: 'Password has been changed.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
    @Put("reset-password/:token")
    async resetPassword(@Param("token") token: string, @Body() body: ResetPasswordDto, @Res() res: Response) {
        try {
            await this.authService.HandleResettingPassword(token, body)
            res.status(200).json({"message" : "password has been changed."})
        } catch (error) {
            throw error
        }
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: '{accessToken : token , refreshToken : token}' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
    @Post("refresh-token")
    async refreshToken( @Req() req: AuthorizedRequest, @Res() res: Response) {
        try {
            const newTokens=await this.authService.validateRefreshToken(req.get("Authorization")?.split(" ")[1] )
            res.status(200).json({...newTokens})
        } catch (error) {
            throw error
        }
    }

}
