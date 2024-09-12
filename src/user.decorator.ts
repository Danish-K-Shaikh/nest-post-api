import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import mongoose, { FlattenMaps } from 'mongoose';
import { User as UserDocType, UserFlatDoc } from './schemas/user.schema';

export const User = createParamDecorator<unknown, any, UserFlatDoc>(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export type UserType = FlattenMaps<UserDocType> & {
  _id: mongoose.Types.ObjectId;
};
