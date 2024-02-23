// DTO (Data Transfer Object)
export interface CreateUserDto {
  id: number | string;
  name: string;
  email: string;
  password: string;
}