import {
  Controller,
  Post,
  Body,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { user_registrationDTO } from './userDTO.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userRepo: UserService) {}

  @Post('/register')
  async Register(@Body() user: user_registrationDTO): Promise<string> {
    const { email } = user;
    try {
      const found_user = await this.userRepo.find_user_by_email(email);
      if (found_user) {
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, error: 'user Already Exists' },
          HttpStatus.FORBIDDEN,
        );
      }
      const new_user = await this.userRepo.createUser(user);
      return new_user && 'user Registered';
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, msg: error.msg },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
