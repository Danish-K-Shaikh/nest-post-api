import { IsNotEmpty } from 'class-validator';
export class PostDto {
  @IsNotEmpty()
  heading: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  user: string;
}

// class Comment {
//   @IsNotEmpty()
//   user: string;

//   @IsNotEmpty()
//   comment: string;
// }
