import { Module } from '@nestjs/common';
import { postSchema, Post } from './post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from 'src/user/user.module';
import { CommentsModule } from 'src/comments/comments.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: postSchema,
      },
    ]),
    UserModule,
    CommentsModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
