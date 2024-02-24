import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  name: {type: String, required: true },
  plate: {type: String, required: true },
  model: {type: String, required: true },
  year: {type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export class Vehicle {
  constructor(
    public id: number,
    public name: string,
    public plate: string,
    public model: string,
    public year: number,
    public created_at: Date,
    public updated_at: Date,
  ) {}
} 