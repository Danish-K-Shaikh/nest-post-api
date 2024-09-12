import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './post.dto';
import { CommentsService } from './comments/comments.service';
import { Public } from 'src/public-strategy';
import { User, UserType } from 'src/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
  ) {}

  @Public()
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addPost(@Body() post: PostDto, @User() user: UserType) {
    return this.postService.addPost({ ...post, user: user._id });
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const Post = await this.postService.getPostById(id);
    const comments = await this.commentService.getCommentsByPostId(id);
    return { ...Post, comments };
  }
}
