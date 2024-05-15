import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async signInByUserTable(user_name: string, password: string) {
    if (!user_name || !password) {
      throw new HttpException(`缺少用户名或密码`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findByName(user_name);
    if (user?.password !== password) {
      throw new HttpException(`用户名或密码错误`, HttpStatus.FORBIDDEN);
    }
    const payload = { user_name: user.user_name, sub: user.id };
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInByWX(post) {
    console.log('code: ' + post.code);
    const url = 'https://api.weixin.qq.com/sns/jscode2session';
    const params = {
      appid: process.env.appId,
      secret: process.env.secret,
      js_code: post.code,
      grant_type: 'authorization_code',
    };

    const { data } = await firstValueFrom(
      this.httpService.get(url, { params }),
    );

    const payload = { session_key: data.session_key, openid: data.openid };

    // 处理响应数据
    console.log('data', data);
    console.log('payload', payload);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
