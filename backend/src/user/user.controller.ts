import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  // insert data
  @Post()
  async createUser(
    @Body() createUser: CreateUserDto) {
    return this.userService.insertUser(createUser);
  }
  
  // get data
  @Get()
  async getAllUser() {
    const users = this.userService.getAllUser();
    return users;
  }
}
