import { Document } from "mongoose"; 

export interface updateVehicleDto extends Document {
  id: string;
  name: string;
  plate: string;
  modelName: string;
  year: number;
  created_at: Date;
  updated_at: Date;
}