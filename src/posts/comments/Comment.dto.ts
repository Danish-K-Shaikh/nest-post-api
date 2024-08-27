import { IsNotEmpty } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  comment: string;
}
