import { createModule } from "@istanbul/app"
import { ProductService } from "./product.service"
import { ProductRouter } from './product.router'

export const productModule = createModule("product", {
  providers: [
    ProductService, ProductRouter
  ],
});

