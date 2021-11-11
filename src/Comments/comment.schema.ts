import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../User/user.schema';
import { Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ required: true })
  comment_content: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
