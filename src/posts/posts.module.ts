import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';

@Module({
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}
