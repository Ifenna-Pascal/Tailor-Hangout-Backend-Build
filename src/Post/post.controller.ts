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

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllPosts(@Request() req): Promise<IPost[]> {
    return await this.postService.allPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('createpost')
  async createPost(@Body() post: PostDTO, @Request() req) {
    try {
      post.owner = req.user._id;
      return await this.postService.createPost(post);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
