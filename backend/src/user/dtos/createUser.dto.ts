// DTO (Data Transfer Object)
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
