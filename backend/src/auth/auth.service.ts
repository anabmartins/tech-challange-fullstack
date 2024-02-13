import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    const user = await this.userService.findOne(email);
      // console.log(pass, user.password);
    const isMatch = await bcrypt.compare(pass, user.password);
    
    if(!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email, name: user.name };
    return {
      acees_token: await this.jwtService.signAsync(payload)
    }
  }
}
