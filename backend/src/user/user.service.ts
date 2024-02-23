import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // insert a user in database
  async insertUser(createUserDto: CreateUserDto) {
    const saltDrRounds = 10;
    const passwordHash = await hash(createUserDto.password, saltDrRounds);

    const newUser = new this.userModel({
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHash,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  // find a specific user
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email}).exec();
  }

  // search for all users in memory
  async getAllUser() {
    const users = await this.userModel.find().exec();
    return users.map((usr) => ({
      id: usr.id,
      name: usr.name,
      email: usr.email,
      password: usr.password,
    }));
  }
}
