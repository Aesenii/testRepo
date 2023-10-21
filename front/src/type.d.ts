export interface IUser {
  _id: string;
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  image: string | null;
  googleId: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName?: string;
  image?: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface IPhoto {
  _id: string;
  title: string;
  image: string | null;
  user: {
    _id: string;
    displayName: string;
  };
}

export interface PhotoMutation {
  title: string;
  image: File | null;
}
