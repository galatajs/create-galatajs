import { onProductCreated } from "../product/product.events";
import { createCategoryService } from "./category.service";

const categoryService = createCategoryService();

onProductCreated.addListener(categoryService.addProductToCategory);