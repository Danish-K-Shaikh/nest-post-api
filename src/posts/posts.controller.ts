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

@Controller('posts')
export class PostsController {
  constructor(
    private postService: PostsService,
    private commentService: CommentsService,
  ) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addPost(@Body() post: PostDto) {
    return this.postService.addPost(post);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    const Post = this.postService.getPostById(id);
    const comments = this.commentService.getCommentsByPostId(id);
    return { ...Post, comments };
  }
}
