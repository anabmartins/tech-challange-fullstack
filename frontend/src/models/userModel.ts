export interface UserCredentials {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  loading: boolean;
  user: null | any;
  error: null | string;
  emailChecked: boolean;
}

export const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
  emailChecked: false
};

export interface JwtPayload {
  name: string;
  email: string;
}

export interface EmailState {
  user: {
    emailChecked: boolean;
  }
}