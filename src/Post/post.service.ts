import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import { PostDTO } from './PostDTO.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(PostDTO: PostDTO): Promise<Post> {
    const newPost = this.postModel.create(PostDTO);
    return newPost;
  }

  async allPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async get_post_by_id(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id });
  }

  async delete_post(id: string) {
    return this.postModel.deleteOne({ _id: id });
  }
}
