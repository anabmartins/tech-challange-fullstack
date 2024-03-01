import { Injectable, NotFoundException } from '@nestjs/common';
import { createVehicleDto } from './dtos/createVehicle.dto';
import { Vehicle } from './interfaces/vehicle.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehicleModel } from './vehicle.model';

@Injectable()
export class VehicleService {
  private vehicles: Vehicle[] = [];

  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {}

  // insert new vehicle in database
  async insertVehicle(createVehicleDto: createVehicleDto) {
    const newVehicle = new this.vehicleModel({
      ...createVehicleDto,
      plate: createVehicleDto.plate.toUpperCase(),
    });
    const result = await newVehicle.save();
    return result.id as string;
  }

  // search for all vehicles in memory
  async getAllVehicles() {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles.map((vhc) => ({
      id: vhc.id,
      name: vhc.name,
      plate: vhc.plate,
      modelName: vhc.modelName,
      year: vhc.year,
    }));
  }

  // Get a single vehicle by ID
  async getVehicleById(id: string): Promise<VehicleModel> {
    let vehicle: any;
    try {
      vehicle = await this.vehicleModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Veículo não encontrado');
    }
    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }
    return vehicle
  }

  // Update a vehicle
  async updateVehicle(id: string, vehicleEdited: VehicleModel) {
    const updatedVehicle = await this.getVehicleById(id);
    if (vehicleEdited.name) {
      updatedVehicle.name = vehicleEdited.name;
    }
    if (vehicleEdited.modelName) {
      updatedVehicle.modelName = vehicleEdited.modelName;
    }
    if (vehicleEdited.plate) {
      updatedVehicle.plate = vehicleEdited.plate;
    }
    if (vehicleEdited.year) {
      updatedVehicle.year = vehicleEdited.year;
    }
    updatedVehicle.save();
  }

  // Delete a vehicle
  async deleteVehicle(id: string) {
    await this.vehicleModel.deleteOne({ _id: id }).exec();
  }
}
