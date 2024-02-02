import { Body, Controller, Get, Post } from '@nestjs/common';
import { createVehicleDto } from './dtos/createVehicle.dto';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './interfaces/vehicle.interface';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // insert data
  @Post()
  async createVehicle(@Body() createVehicle: createVehicleDto): Promise<Vehicle> {
    return this.vehicleService.createVehicle(createVehicle);
  }
  
  @Get()
  async getAllUser() {
    return this.vehicleService.getAllVehicles();
  }
}
