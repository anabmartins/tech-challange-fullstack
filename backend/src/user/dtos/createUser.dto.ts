// DTO (Data Transfer Object)
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  creationDate: Date;
  lastUpdateDate: Date;
}
