import { createEvent } from "@istanbul/events";
import { Product } from "./product.model";

export const onProductCreated = createEvent<Product>("productCreated");
