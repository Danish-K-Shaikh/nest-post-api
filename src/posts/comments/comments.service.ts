import { HttpException, Injectable } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentFlatDoc } from 'src/schemas/comment.schema';
import mongoose, { Model, Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    private postService: PostsService,
    @InjectModel(Comment.name) private commentSchema: Model<Comment>,
  ) {}

  async getCommentById(_commentId: string) {
    const comment = await this.commentSchema.findById(_commentId).lean();
    return comment;
    // const comment = this.Comments.find(({ id }) => id === _commentId);
    // if (!comment) throw new HttpException('Comment not found', 404);
    // return comment;
  }

  async getCommentsByPostId(_postId: string) {
    const post = await this.postService.getPostById(_postId);
    console.log({ _postId, post });
    // const post = this.postService.getPostById(_postId);
    if (!post) throw new HttpException('Post not found', 404);
    return await this.commentSchema.find({ post: post._id });
    // const comments = this.Comments.filter(({ postId }) => postId === _postId);
    // return comments;
  }

  async addComment(postId: string, commentData) {
    const post = await this.postService.getPostById(postId);
    if (!post) throw new HttpException('Post not found', 404);
    const newComment: CommentFlatDoc = {
      _id: new mongoose.Types.ObjectId(),
      post: postId,
      ...commentData,
    };
    const newCommentDb = new this.commentSchema(newComment);
    return newCommentDb.save();
  }

  async updateCommentById(
    commentId: string,
    user: Types.ObjectId | string,
    commentText: string,
  ) {
    const commentObj = await this.getCommentById(commentId);
    console.log({ commentObj });
    if (commentObj.user.toString() !== user.toString())
      throw new HttpException('Forbidden', 403);
    return await this.commentSchema.updateOne({
      _id: commentObj._id,
      comment: commentText,
    });
  }
}
