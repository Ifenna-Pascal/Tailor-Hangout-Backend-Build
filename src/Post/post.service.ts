import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import { PostDTO } from './PostDTO.dto';
import { IPost } from './post_interface';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  // create post
  async createPost(PostDTO: PostDTO): Promise<PostDocument> {
    try {
      const newPost = this.postModel.create(PostDTO);
      return newPost;
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }

  // view all post
  async allPosts(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate({ path: 'owner', select: 'username email' })
      .populate({
        path: 'comments',
        select: 'comment_content',
        populate: { path: 'owner', select: 'username email' },
      })
      .exec();
  }

  // comment to post
  async find_and_update(id: string, comment_id: string): Promise<PostDocument> {
    const updated_post = await this.postModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { comments: comment_id } },
    );
    return updated_post;
  }

  // get one post
  async get_post_by_id(id: string): Promise<Post> {
    return this.postModel
      .findOne({ _id: id })
      .populate({ path: 'owner', select: 'username email' })
      .populate({
        path: 'comments',
        select: 'comment_content',
        populate: { path: 'owner', select: 'username email' },
      })
      .exec();
  }

  // delete post
  async delete_post(id: string) {
    return this.postModel.deleteOne({ _id: id });
  }
}
