import { CreateProduct } from "./product.entity";
import { Product } from "./product.model";

const createProduct = (name: string, price: number): Product => {
  const product = CreateProduct(name, price);
  return product;
};

export const createProductService = () => {
  return {
    createProduct,
  };
 };
