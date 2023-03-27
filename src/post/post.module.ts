import entities  from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports : [TypeOrmModule.forFeature(entities)],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
