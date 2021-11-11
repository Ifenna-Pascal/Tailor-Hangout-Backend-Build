import { Types } from 'mongoose';
export class PostDTO {
  title: string;
  content: string;
  post_media?: string;
  owner: Types.ObjectId;
  likes: number;
  comments: Types.ObjectId[];
  createdAt: Date;
}
