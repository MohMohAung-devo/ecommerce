export interface ApiResponse {
  meta: Meta;
  body: Body;
}

export interface Body {
  register: RegisterPayload[];
}
export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  currentLocation: string;
  password: string;
}

export interface Meta {
  success: boolean;
  message: string;
}
