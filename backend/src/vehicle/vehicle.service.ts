import { Injectable } from '@nestjs/common';
import { createVehicleDto } from './dtos/createVehicle.dto';
import { Vehicle } from './interfaces/vehicle.interface';

@Injectable()
export class VehicleService {
  private vehicles: Vehicle[] = [];

  async createVehicle(createVehicleDto: createVehicleDto): Promise<Vehicle> {
    const vehicle: Vehicle = {
      ...createVehicleDto,
      id: this.vehicles.length + 1
    };

    this.vehicles.push(vehicle);

    return vehicle;
  }
  // search for all vehicles in memory
  async getAllVehicles(): Promise<Vehicle[]> {
    return this.vehicles;
  }
}
