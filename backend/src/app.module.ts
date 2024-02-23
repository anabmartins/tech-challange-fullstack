import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
const uri = "mongodb+srv://anabmartins:7mnuPof3aZR9YabI@cluster0.bl2rc47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

@Module({
  imports: [
    UserModule,
    VehicleModule,
    AuthModule,
    MongooseModule.forRoot(uri),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
