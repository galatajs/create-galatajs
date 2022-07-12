import { createProductController } from "./product.controller";
import { createProductService } from "./product.service";

const productService = createProductService();
const productController = createProductController(productService);
