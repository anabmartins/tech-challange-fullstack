import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(createUserDto: CreateUserDto) {
    const saltDrRounds = 10;
    const passwordHash = await hash(createUserDto.password,
saltDrRounds);

    const newUser = new this.userModel({
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHash,
    })
    const result = await newUser.save();
    console.log(result);
    return 'id'
  }

//   async createUser(createUserDto: CreateUserDto): Promise<User> {
//     // generate a hash for the password using bcrypt
//     const saltDrRounds = 10;
//     const passwordHash = await hash(createUserDto.password,
// saltDrRounds);

//     const user: User = {
//       ...createUserDto,
//       id: this.users.length + 1,
//       password: passwordHash,
//     };

//     this.users.push(user);
//     return user;
//   }


  //find a user by name
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  // search for all users in memory
  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
