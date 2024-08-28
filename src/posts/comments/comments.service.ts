import { HttpException, Injectable } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { COMMENTS, Comment } from 'src/Database';

@Injectable()
export class CommentsService {
  private readonly Comments: Comment[] = COMMENTS;
  constructor(private postService: PostsService) {}

  getCommentById(_commentId: string): Comment {
    const comment = this.Comments.find(({ id }) => id === _commentId);
    if (!comment) throw new HttpException('Comment not found', 404);
    return comment;
  }

  getCommentsByPostId(_postId: string) {
    const post = this.postService.getPostById(_postId);
    if (!post) throw new HttpException('Post not found', 404);
    const comments = this.Comments.filter(({ postId }) => postId === _postId);
    return comments;
  }

  addComment(postId: string, commentData: Omit<Comment, 'id' | 'postId'>) {
    const post = this.postService.getPostById(postId);
    if (!post) throw new HttpException('Post not found', 404);
    const newComment = {
      id: new Date().getTime() + '',
      postId,
      ...commentData,
    };
    this.Comments.push(newComment);
    return { id: newComment.id };
  }

  updateCommentById(commentId: string, user: string, commentText: string) {
    const commentObj = this.getCommentById(commentId);
    if (commentObj.user !== user) throw new HttpException('Forbidden', 403);
    commentObj.comment = commentText;
    return commentObj;
  }
}
