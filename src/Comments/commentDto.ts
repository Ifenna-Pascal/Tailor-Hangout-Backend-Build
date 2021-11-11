import { Types } from 'mongoose';

export class CommentDTO {
  owner: Types.ObjectId;
  comment_content: string;
  createdAt: Date;
}
