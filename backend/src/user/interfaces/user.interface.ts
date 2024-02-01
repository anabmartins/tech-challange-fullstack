export interface User{
  id: number;
  fullName: string;
  emailAddress: string;
  encryptedPassword: string;
  creationDate: Date; 
  lastUpdateDate: Date; 
}