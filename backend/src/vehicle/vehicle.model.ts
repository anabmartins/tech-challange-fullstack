import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  name: {type: String, required: true },
  plate: {type: String, required: true },
  modelName: {type: String, required: true },
  year: {type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export interface VehicleModel extends Document {
    id: string;
    name: string;
    plate: string;
    modelName: string;
    year: number;
    created_at: Date;
    updated_at: Date;
} 