import { createRouter, Request, Response } from "@istanbul/http";
import { Product } from "./product.model";

export const createProductController = (productService) => {
  createRouter({ prefix: "product" })
    .post("create", async (req: Request, res: Response) => {
      const product = await productService.createProduct(req.body);
      res.successData<Product>(product);
    })
    .get(":id", async (req: Request, res: Response) => {
      res.notFound(`Product id ${req.params.id} not found`);
    });
};
