import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true },
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public created_at: Date,
    public updated_at: Date,
  ) {}
} 