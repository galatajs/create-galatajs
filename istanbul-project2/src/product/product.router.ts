import { createRouter, Request, Response } from "@istanbul/http"
import { OnAppStarted } from "@istanbul/app"
import { ProductService } from "./product.service"
import { Product } from "./product.entity"

export class ProductRouter implements OnAppStarted {
  private productService: ProductService;
  constructor(params :  { productService: ProductService }) {
    this.productService = params.productService;
  }
  onAppStarted() : void {
    this.init();
  }
  private init() : void {
    const router = createRouter({ prefix: 'products' });
    router.post('create', this.createProduct.bind(this));
    router.get(':id', this.getProduct.bind(this));
  };
  private async createProduct(req : Request, res : Response) : Promise<void> {
    const product = await this.productService.createProduct(req.body);
    res.successData<Product>('Product successfully created', product);
  }
  private async getProduct(req : Request, res : Response) : Promise<void> {
    const product = await this.productService.getProductById(req.params.id);
    res.successData<Product>('Product successfully retrieved', product);
  }
}


export {  }