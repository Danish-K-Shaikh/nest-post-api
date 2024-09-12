import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/posts.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

@Module({
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
})
export class PostsModule {}
