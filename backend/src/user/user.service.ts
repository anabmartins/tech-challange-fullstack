import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // generate a hash for the password using bcrypt
    const saltDrRounds = 10;
    const passwordHash = await hash(createUserDto.password,
saltDrRounds);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHash,
    };

    this.users.push(user);

    return user;
  }

  //find a user by name
  async findOne(name: string): Promise<User | undefined> {
    return this.users.find(user => user.name === name);
  }


  // search for all users in memory
  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
