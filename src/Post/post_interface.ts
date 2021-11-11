import { Types } from 'mongoose';
export interface IPost {
  title: string;
  content: string;
  post_media?: string;
  owner: Types.ObjectId;
  createdAt: Date;
  _id: string;
}
