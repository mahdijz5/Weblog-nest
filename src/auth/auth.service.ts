import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, ResetPasswordParams } from './../utils/types';
import { BadRequestException, Injectable,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { User } from '../entities';
import {hash,compare} from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

    async createUser(data: CreateUserParams) {
        try {
            const user = await this.userRepository.findOneBy({ email: data.email })
            if (user) throw new BadRequestException({ "message": "This User already exists." })
            const hashedPassword = await hash(data.password, 10)
            const newUser = this.userRepository.create({ ...data, password: hashedPassword })
            this.userRepository.save(newUser)
            return newUser;
            
        } catch (error) {
            throw error
        }
    }

    async validateRefreshToken(token : string) {
        try {
            const decoded = await this.jwtService.verifyAsync(token, { secret: process.env.REFRESH_TOKEN_SECRET }) 
            return this.generateToken(decoded)
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async sendMail(token){
        try {
            let response;
            const decoded = await this.validateRefreshToken(token)
            return {message : "its supposed to send this email to user"}
        } catch (error) {
            throw error
        }
    }

    generateToken(user) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            }, { secret: process.env.ACCESS_TOKRN_SECRET }),
            refreshToken: this.jwtService.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            },
                { secret: process.env.REFRESH_TOKEN_SECRET })
        }
    }

    async validate(email, password) {
        try {
            const user = await this.userRepository.findOneBy({ email })
            if (!user) throw new BadRequestException({ "message": "This User doesn't exists." })

            if (!await compare(password, user.password)) throw new UnauthorizedException()

            return user
        } catch (error) {
            throw error
        }
    }

    async validateEmailToChangePassword({email}:{email :string}) {
        try {
            const user = await this.userRepository.findOneBy({email})
            if (!user) throw new UnauthorizedException({ "message": "This User doesn't exists." })

            const token = await this.jwtService.signAsync({
                email: user.email,
                id: user.id,
            }, { secret: process.env.RESET_PASSWORD_TOKEN_SECRET })
            
            return { "message": "its supposed to send this link ", "link": `${process.env.SERVER_URL}/user/reset-password/${token}`}
        } catch (error) {
            throw error
        }
    }

    async HandleResettingPassword(token :string,body : ResetPasswordParams) {
        try {
            const decodedToken = await this.jwtService.verifyAsync(token, { secret: process.env.RESET_PASSWORD_TOKEN_SECRET }) 
            if(body.password !== body.confirmPassword) {throw new UnauthorizedException()}

            const password =await hash(body.password , 10)

            return await this.userRepository.update({id : decodedToken.id}, {password})

        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}
