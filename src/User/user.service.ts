import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument, User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { user_LoginDTO, user_registrationDTO } from './userDTO.dto';
import * as bcrypt from 'bcrypt';

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

  async find_and_update(id: string, post_id: string): Promise<User> {
    const updated_user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { posts: post_id } },
    );
    return updated_user;
  }

  async Register_User(user: user_registrationDTO): Promise<User> {
    const { email } = user;
    const found_user = await this.find_user_by_email(email);
    if (found_user) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'user Already Exists' },
        HttpStatus.FORBIDDEN,
      );
    }
    const new_user = await this.createUser(user);
    return new_user;
  }

  async Login_User(user: user_LoginDTO): Promise<User> {
    const { email, password } = user;
    const found_user = await this.find_user_by_email(email);
    if (!found_user) {
      throw new HttpException('user not found', HttpStatus.FORBIDDEN);
    }
    // compare passwords
    const equal = await bcrypt.compare(password, found_user.password);
    console.log(equal);
    if (!equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return found_user;
  }
}
