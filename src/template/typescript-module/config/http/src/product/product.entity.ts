import { Product } from "./product.model";

export const CreateProduct = (name: string, price: number): Product => {
  return {
    name,
    price,
    stock: 0,
  };
};
