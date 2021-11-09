import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
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

  @Prop()
  profile_img: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
