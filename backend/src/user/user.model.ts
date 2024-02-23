import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true },
  email: {type: String, required: true },
  password: {type: String, required: true },
})

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
  ) {}
} 