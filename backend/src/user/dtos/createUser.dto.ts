// DTO (Data Transfer Object)
export interface CreateUserDto {
  fullName: string;
  emailAddress: string;
  encryptedPassword: string;
  creationDate: Date;
  lastUpdateDate: Date;
}
