import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: 
  [ConfigModule.forRoot({
    envFilePath: ['.env.development.local'],
  }),
  UserModule,
  VehicleModule,
  AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}