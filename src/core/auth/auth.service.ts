import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { fetch } from 'cross-fetch';

import { UserSignUpDto } from './dto/user-sign-up.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from '../user/user.entity';
import { AUTH_ERROR } from './enum/auth-error.enum';
import { LoginInfoDto } from './dto/login-info.dto';
import { AccountDataDto } from './dto/account-data.dto';
import { AuthRepository } from './auth.repository';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<LoginInfoDto> {
    const user: UserEntity = await this.authRepository.signUp(userSignUpDto);

    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginInfoDto> {
    const userData = await this.authRepository.login(userLoginDto);

    const accessToken = await this.createJwt(userData);

    const loginInfo: LoginInfoDto = { accessToken };
    return loginInfo;
  }

  async signUpWithGoogle(body: any): Promise<any> {
    const token = body.accessToken;
    const url =
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=` + token;
    const response = await fetch(url);
    const json = await response.json();
    if (json.error) {
      return new BadRequestException();
    } else {
      const user = await this.userService.saveGoogleUser({
        email: json.email,
        googleId: json.user_id,
      });
      const accessToken = await this.createJwt(user);
      return { accessToken };
    }
  }
  async signUpWithFacebook(body: any): Promise<any> {
    const token = body.accessToken;
    const url = `https://graph.facebook.com/me?access_token=` + token;
    const response = await fetch(url);
    const json = await response.json();
    if (json.error) {
      return new BadRequestException();
    } else {
      const user = await this.userService.saveFacebookUser({
        email: json.email,
        facebookId: json.user_id,
      });
      const accessToken = await this.createJwt(user);
      return { accessToken };
    }
  }

  async createJwt(user: UserEntity): Promise<string> {
    const { id, role } = user;

    const payload: JwtPayload = {
      id,
      role,
    };

    return this.jwtService.sign(payload);
  }

  async updateLogin(user: UserEntity): Promise<LoginInfoDto> {
    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async getAccountById(id: string): Promise<UserEntity> {
    const user = await this.authRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException(AUTH_ERROR.USER_WITH_THIS_ID_NOT_FOUND);
    }

    return user;
  }

  async getAccountInfo(user: UserEntity): Promise<AccountDataDto> {
    const accountData: AccountDataDto = {
      id: user.id,
    };

    return accountData;
  }
}
