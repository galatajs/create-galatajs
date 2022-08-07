import { createModule } from "@istanbul/app"
import { ProductService } from "./product.service"

export const productModule = createModule("product", {
  providers: [
    ProductService
  ],
});

