import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { user_LoginDTO, user_registrationDTO } from 'src/user/userDTO.dto';
import { AuthService } from './auth.service';
import { Status } from './interface';
import { UserDocument } from 'src/user/user.schema';
import { JwtAuthGuard } from './jwtGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() user: user_registrationDTO): Promise<Status> {
    const res: Status = await this.authService.Register(user);
    if (!res.success) {
      throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Post('login')
  public async login(@Body() user: user_LoginDTO): Promise<string> {
    return await this.authService.Login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myprofile')
  public async get_profile(@Request() req): Promise<UserDocument> {
    const user: UserDocument = req.user;
    delete user.password;
    console.log(user._id);
    return user;
  }
}
