import { Product } from "./product.entity"

export class ProductService {
 async createProduct(product: Product): Promise<Product> {
  	return product;
 }

 async getProductById(id: string) : Promise<Product | null> {
  return null;
 }
}

