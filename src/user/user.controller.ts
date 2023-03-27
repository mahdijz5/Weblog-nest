import { JwtGuard } from './../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { Controller, Get, Param, ParseIntPipe, UseGuards, Post, Body, Req, Put, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './dto';
import { AuthorizedRequest } from 'src/interfaces';


@ApiTags("User")
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private userService : UserService) {}

  
    @ApiCreatedResponse({description :"Post has been created."})
    @ApiBadRequestResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Post("/post")
    async addNewPost(@Body() body : CreatePostDto,@Req() req : AuthorizedRequest){
        try {
            return await this.userService.createPost({...body,userId :req.user.id})
        } catch (error) {
            throw error
        }
    }

    @ApiOkResponse()
    @ApiBadRequestResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Get("/posts")
    async getPosts(@Req() req : AuthorizedRequest){
        try {
            return await this.userService.getUserPosts(req.user.id)
        } catch (error) {
            throw error
        }
    }


    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        try {
            return await this.userService.getUser(id)
        } catch (error) {
            throw error
        }
    }

    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Put("post/:id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() body: UpdatePostDto, @Req() req: AuthorizedRequest) {
        try {
            return await this.userService.updatePost(req.user.id,{...body,id})
        } catch (error) {
            throw error
        }
    }

    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Delete("post/:id")
    async deletePost(@Param("id", ParseIntPipe) id: number, @Req() req: AuthorizedRequest) {
        try {
            return await this.userService.removePost(req.user.id,id)
        } catch (error) {
            throw error
        }
    }

}
