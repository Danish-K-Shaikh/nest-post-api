import { Injectable } from '@nestjs/common';
import { Post, POSTS } from 'src/Database';

@Injectable()
export class PostsService {
  private readonly Posts: Post[] = POSTS;

  getAllPosts(): Post[] {
    return POSTS;
  }
  addPost(post: Omit<Post, 'id'>): Post {
    const newPost: Post = {
      id: String(new Date().getTime()),
      ...post,
    };
    this.Posts.push(newPost);
    return newPost;
  }
  getPostById(id: string): Post {
    const post = this.Posts.find((x) => x.id === id);
    return post;
  }
}
