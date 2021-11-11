import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from 'src/post/post.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;
interface IOptions extends SchemaOptions {
  usePushEach: boolean;
}

const Options: IOptions = {
  usePushEach: true,
};
@Schema(Options)
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, minlength: 7 })
  password: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
      },
      message: 'Please Enter A valid Email',
    },
  })
  email: string;

  @Prop({ required: true })
  profile_img: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
