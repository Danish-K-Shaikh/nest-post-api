import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post as PostClass } from 'src/schemas/posts.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostClass.name) private postSchema: Model<PostClass>,
    @InjectModel(User.name) private userSchema: Model<User>,
  ) {}
  getAllPosts() {
    return this.postSchema.find({});
  }
  async addPost(post) {
    const newPost = new this.postSchema({
      _id: new Types.ObjectId(),
      ...post,
    });
    return newPost.save();
  }
  getPostById(id: string) {
    return this.postSchema.findById(id).lean();
  }
}
