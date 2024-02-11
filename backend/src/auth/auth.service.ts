import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async signIn(
    email: string, 
    pass: string
    ): Promise<{ acees_token: string }> {
    const user = await this.userService.findOne(email)
    if(user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email };
    return {
      acees_token: await this.jwtService.signAsync(payload)
    }
  }
}
