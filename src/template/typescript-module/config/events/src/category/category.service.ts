import { createCategory } from "./category.entity";
import { Product } from "../product/product.model";

const mainCategory = createCategory();

const addProductToCategory = (product: Product): void => {
  mainCategory.products.push(product);
};

export const createCategoryService = () => {
  return {
    addProductToCategory,
  };
};
