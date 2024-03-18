export interface AddProductPayload {
  meta: Meta;
  body: Body;
}

export interface Body {
  productAll: ProductAll[];
}

export interface ProductAll {
  image: Image;
  name: string;
  amount: number;
  date: Date;
}

export interface Image {
  contentType: string;
  path: string;
}

export interface Meta {
  success: boolean;
  message: string;
}
