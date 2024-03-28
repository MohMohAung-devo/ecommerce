export interface AddProductPayload {
  meta: Meta;
  body: Body;
}

export interface Body {
  productAll: ProductAll[];
}

export interface ProductAll {
  _id: string;
  image: Image;
  name: string;
  amount: number;
  price: number;
  count: number;
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
