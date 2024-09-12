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
import { User } from 'src/user.decorator';
import { UserFlatDoc } from 'src/schemas/user.schema';

@Controller('posts/:id/comment')
export class CommentsController {
  constructor(private commentService: CommentsService) {}
  @Get()
  getCommentsByPostId(@Param('id') id: string) {
    return this.commentService.getCommentsByPostId(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addComment(
    @Param('id') postId: string,
    @Body() commentData: CommentDTO,
    @User() user: UserFlatDoc,
  ) {
    return this.commentService.addComment(postId, { ...commentData, user });
  }

  @Put('/:commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body('comment') comment: string,
    @User() user: UserFlatDoc,
  ) {
    if (!comment) throw new HttpException('comment cannot be empty', 400);
    return this.commentService.updateCommentById(commentId, user._id, comment);
  }
}
