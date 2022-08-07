import { createRouter } from "@istanbul/http"
import { ProductService } from "./product.service"

export class ProductController {


  #productService;


  constructor({ productService }) {
    this.#productService = productService;
  }


  onAppStarted() {
    this.#init();
  }


  #init() {
    const router = createRouter({ prefix: 'products' });
    router.post('create', this.#createProduct.bind(this));
    router.get(':id', this.#getProduct.bind(this));
  };


  async #createProduct(req, res) {
    const product = await this.#productService.createProduct(req.body);
    res.successData('Product successfully created', product);
  }


  async #getProduct(req, res) {
    const product = await this.#productService.getProductById(req.params.id);
    res.successData('Product successfully retrieved', product);
  }
}


