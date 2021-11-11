import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { PostDTO } from './PostDTO.dto';
import { JwtAuthGuard } from 'src/Auth/jwtGuard';
import { IPost } from './post_interface';
import { UserService } from 'src/user/user.service';
import { CommentsService } from 'src/comments/comments.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly commentService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllPosts(@Request() req): Promise<any[]> {
    return await this.postService.allPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('createpost')
  async createPost(@Body() post: PostDTO, @Request() req) {
    try {
      post.owner = req.user._id;
      const post_created = await this.postService.createPost(post);
      if (post_created) {
        return await this.userService.find_and_update(
          req.user._id,
          post_created._id,
        );
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
