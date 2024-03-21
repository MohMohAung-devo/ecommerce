export interface UserListPayload {
  meta: Meta;
  body: Body;
}

export interface Body {
  websiteUserAll: WebsiteUserAll[];
}

export interface WebsiteUserAll {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface Meta {
  success: boolean;
  message: string;
}
