import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { FlattenMaps, HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;
export type CommentFlatDoc = FlattenMaps<Comment> & {
  _id: Types.ObjectId | string;
};
@Schema()
export class Comment {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

  @Prop()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
