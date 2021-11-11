import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { CommentDTO } from './commentDto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(comment: CommentDTO): Promise<CommentDocument> {
    try {
      const new_comment = await this.commentModel.create(comment);
      return new_comment;
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }
}
