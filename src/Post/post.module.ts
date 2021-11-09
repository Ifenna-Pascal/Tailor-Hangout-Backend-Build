import { Module } from '@nestjs/common';
import { postSchema, Post } from './post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: postSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
