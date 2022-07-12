import { CreateProduct } from "./product.entity";
import { onProductCreated } from "./product.events";
import { Product } from "./product.model";

const createProduct = (name: string, price: number): Product => {
  const product = CreateProduct(name, price);
  onProductCreated.publish(product);
  return product;
};

export const createProductService = () => {
  return {
    createProduct,
  };
};
