import { Injectable } from '@nestjs/common';
import { createVehicleDto } from './dtos/createVehicle.dto';
import { updateVehicleDto } from './dtos/updateVehicle.dto';
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

   // Get a single vehicle by ID
   async getVehicleById(id: string): Promise<Vehicle> {
    const vehicle = this.vehicles.find(vehicle => vehicle.id.toString() === id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  }

  // Update a vehicle
  async updateVehicle(id: string, updateVehicleDto: updateVehicleDto): Promise<Vehicle> {
    const vehicleIndex = this.vehicles.findIndex(vehicle => vehicle.id.toString() === id);
    if (vehicleIndex === -1) {
      throw new Error('Vehicle not found');
    }
    // Merge the updateVehicleDto into the existing vehicle object
    this.vehicles[vehicleIndex] = { ...this.vehicles[vehicleIndex], ...updateVehicleDto };
    return this.vehicles[vehicleIndex];
  }

  // Delete a vehicle
  async deleteVehicle(id: string): Promise<void> {
    const vehicleIndex = this.vehicles.findIndex(vehicle => vehicle.id.toString() === id);
    if (vehicleIndex === -1) {
      throw new Error('Vehicle not found');
    }
    this.vehicles.splice(vehicleIndex, 1);
  }
}
