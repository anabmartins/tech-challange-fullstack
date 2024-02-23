import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from './vehicle.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }])],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService]
})

export class VehicleModule {}
