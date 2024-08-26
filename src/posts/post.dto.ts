import { IsNotEmpty } from 'class-validator';
export class PostDto {
  @IsNotEmpty()
  heading: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user: string;

  likes: string[];

  comments: Comment[];
}

class Comment {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  comment: string;
}
