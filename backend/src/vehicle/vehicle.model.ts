import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  name: {type: String, required: true },
  plate: {type: String, required: true, unique: true },
  model: {type: String, required: true },
  year: {type: Number, required: true },
})

export class Vehicle {
  constructor(
    public id: number,
    public name: string,
    public plate: string,
    public model: string,
    public year: number,
  ) {}
} 