import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { FlattenMaps, HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserFlatDoc = FlattenMaps<User> & { _id: Types.ObjectId };

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
