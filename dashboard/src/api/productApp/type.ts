// export interface AddProductPayload {
//   meta: Meta;
//   body: Body;
// }

// export interface Body {
//   addProductData: AddProductData[];
// }

// export interface AddProductData {
//   name: string;
//   amount: number;
//   image: string;
//   date: Date;
//   // filename: string;
// }

// export interface Meta {
//   success: boolean;
//   message: string;
// }

export interface AddProductPayload {
  meta: Meta;
  body: Body;
}

export interface Body {
  productAll: ProductAll[];
}

export interface ProductAll {
  image: {
    path: File | null;
  };
  _id: string;
  name: string;
  amount: number;
  date: Date;
  __v: number;
}

export interface Image {
  contentType: string;
  path: string;
}

export interface Meta {
  success: boolean;
  message: string;
}
