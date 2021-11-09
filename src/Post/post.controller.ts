import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO } from './PostDTO.dto';
import { IPost } from './post_interface';

@Controller('post')
export class PostController {
    constructor (private readonly postService: PostService){};

    @Get()
    async findAllPosts(): Promise<IPost[]>{
        return  await this.postService.allPosts()
    }

    @Post("createpost")
    async createPost(@Body() post:PostDTO){
        console.log(post);
        return await this.postService.createPost(post)
    }
    
}
