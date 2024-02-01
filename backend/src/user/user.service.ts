import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    // generate a hash for the password using bcrypt
    const saltDrRounds = 10
    const passwordHash = await hash(createUserDto.encryptedPassword, saltDrRounds);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      encryptedPassword: passwordHash,
    }

    this.users.push(user);

    return user;
  }

  // search for all users in memory
  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
