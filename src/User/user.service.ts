import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { user_registrationDTO } from './userDTO.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: user_registrationDTO): Promise<User> {
    const new_user = await this.userModel.create(user);
    return new_user;
  }

  async find_user_by_email(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
