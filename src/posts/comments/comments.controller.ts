import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDTO } from './Comment.dto';

@Controller('posts/:id/comment')
export class CommentsController {
  constructor(private commentService: CommentsService) {}
  @Get()
  getCommentsByPostId(@Param('id') id: string) {
    return this.commentService.getCommentsByPostId(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addComment(@Param('id') postId: string, @Body() commentData: CommentDTO) {
    return this.commentService.addComment(postId, commentData);
  }

  @Put('/:commentId')
  @UsePipes(new ValidationPipe())
  updateComment(
    @Param('commentId') commentId: string,
    @Body('comment') comment: string,
  ) {
    if (!comment) throw new HttpException('comment cannot be empty', 400);
    return this.commentService.updateCommentById(commentId, comment);
  }
}
