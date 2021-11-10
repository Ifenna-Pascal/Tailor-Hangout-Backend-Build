import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { user_LoginDTO, user_registrationDTO } from 'src/user/userDTO.dto';
import { Status } from './interface';
import { IUser } from 'src/User/userInterFace';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async Register(user: user_registrationDTO): Promise<Status> {
    let status: Status = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.Register_User(user);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async Login(user_info: user_LoginDTO): Promise<string> {
    const user = await this.usersService.Login_User(user_info);

    // generate and sign token
    const token = this._create_token(user.email);
    return token;
  }

  private _create_token(email): string {
    const access_token = this.jwtService.sign({ email });
    return access_token;
  }

  async ValidateUser(email: string): Promise<unknown> {
    const user = await this.usersService.find_user_by_email(email);
    console.log(user);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
