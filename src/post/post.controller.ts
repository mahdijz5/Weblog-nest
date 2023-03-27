import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags("Post")
@Controller('post')
export class PostController {
    constructor(private postService : PostService) {}
    

    @ApiOkResponse()
    @ApiQuery({name : "limit" , type : Number,required : false})
    @ApiQuery({name : "page" , type : Number,required : false})
    @Get()
    async findAll(@Query() query: { limit: number,page : number }) {
        const limit = query.limit || 10
        const page = query.page || 1
        try {
            return await this.postService.getAllPosts(limit, page)
        } catch (error) {
            throw error
        }

    }

    @ApiOkResponse()
    @ApiQuery({ name: "limit", type: Number,required : false })
    @ApiQuery({ name: "page", type: Number,required : false })
    @ApiQuery({ name: "search", type: String,required : false })
    @Get("search")
    async search(@Query() query: { limit: number, page: number,search : string }) {
        const limit = query.limit || 10
        const page = query.page || 1
        const search = query.search || ""
        try {
            return await this.postService.search(limit, page, search)
        } catch (error) {
            throw error
        }
    }

}
