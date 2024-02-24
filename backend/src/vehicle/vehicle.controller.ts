import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createVehicleDto } from './dtos/createVehicle.dto';
import { updateVehicleDto } from './dtos/updateVehicle.dto';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './interfaces/vehicle.interface';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  // insert data
  @Post()
  async createVehicle(
    @Body() createVehicle: createVehicleDto) {
    return this.vehicleService.insertVehicle(createVehicle);
  }

  // get data
  @Get()
  async getAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  // get single data
  @Get(':id')
  async getVehicleById(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.getVehicleById(id);
  }

  // update data
  @Patch(':id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicle: updateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.updateVehicle(id, updateVehicle);
  }

  // delete data
  @Delete(':id')
  async deleteVehicle(@Param('id') id: string) {
    await this.vehicleService.deleteVehicle(id);
  }
}
