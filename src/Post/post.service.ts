import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import { PostDTO } from './PostDTO.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(PostDTO: PostDTO): Promise<Post> {
    try {
      const newPost = this.postModel.create(PostDTO);
      return newPost;
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }

  async allPosts(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate({ path: 'owner', select: 'username email' })
      .exec();
  }

  async get_post_by_id(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id });
  }

  async delete_post(id: string) {
    return this.postModel.deleteOne({ _id: id });
  }
}
