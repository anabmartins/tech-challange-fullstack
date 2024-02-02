import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
