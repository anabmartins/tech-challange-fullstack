export interface UserCredentials {
  name: string;
  email: string;
  password: string;
}
interface UserState {
  loading: boolean;
  user: null | any;
  error: null | string;
}

export const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

export interface JwtPayload {
  name: string;
  email: string;
}