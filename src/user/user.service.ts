import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostParams, UpdatePostParams } from 'src/utils/types';
import { Post, User } from 'src/entities';

@ApiTags("User")
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Post) private postRepository: Repository<Post>) {}


    async getUser(id: number) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if (!user) throw new NotFoundException()
            return user
        } catch (error) {
            throw error
        }
    }

    async createPost(data : CreatePostParams) {
        try {
            const user = await this.userRepository.findOneBy({id : data.userId})
            if(!user) throw new BadRequestException()
            
            const post = await this.postRepository.create({body : data.body,title : data.title,user} )
            
            this.postRepository.save(post)
            
            return post
        } catch (error) {
            throw error
        }
    }

    async updatePost(id :number,data : UpdatePostParams) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if(!user) throw new BadRequestException()
            
            const post = await this.postRepository.findOne({
                relations : ['user'],
                where : {
                    id: data.id
                }
            })
            if(!post) throw new NotFoundException({"message" :"Post doesnt exist"})

            if(post.user.id !== id) throw new UnauthorizedException()
            
            post.body = data.body || post.body  
            post.title = data.title || post.title

            await this.postRepository.save(post)

            return post
        } catch (error) {
            throw error
        }
    }

    async removePost(id :number,postId : number ) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if(!user) throw new BadRequestException()
            
            const post = await this.postRepository.findOne({
                relations : ['user'],
                where : {
                    id: postId
                }
            })
            if(!post) throw new NotFoundException({"message" :"Post doesnt exist"})

            if(post.user.id !== id) throw new UnauthorizedException()
            
            await this.postRepository.remove(post)

            return {"message" :"Post has been removed"}
        } catch (error) {
            throw error
        }
    }


    async getUserPosts(id:number) {
        try {
            const user = await this.userRepository.findOneBy({id})
            if(!user) throw new BadRequestException()
            
            return await this.postRepository.find({
                relations : ['user'],
                where : {
                    user,
                }
            })

        } catch (error) {
            throw error
        }
    }
}
