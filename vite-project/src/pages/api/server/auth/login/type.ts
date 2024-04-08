export interface ApiResponse {
  meta: Meta;
  body: Body;
}

export interface Body {
  register: LoginPayload[];
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface Meta {
  success: boolean;
  message: string;
}
