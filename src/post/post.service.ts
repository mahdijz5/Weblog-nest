import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Query } from '@nestjs/common';
import { Post } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>) { }

    async getAllPosts(limit, page) {
        return await this.postRepository.find({
            take: limit,
            skip: (page - 1) * limit,
            relations: ["user"],
        })
    }

    async search(limit: number, page: number, searchQuery :string) {
        const query = `%${searchQuery}%`
        try {
            const queryBuilder = this.postRepository.createQueryBuilder('post')
            queryBuilder.where('post.title LIKE :query', { query }).limit(limit).offset((page - 1) * limit);
            return await queryBuilder.getMany();
        } catch (error) {
            throw error
        }
    }
}
