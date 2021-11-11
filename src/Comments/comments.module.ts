import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './comment.schema';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: commentSchema,
      },
    ]),
  ],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
