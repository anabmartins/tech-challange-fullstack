import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email)
    if(user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // JWT here
    return result
 }
}
