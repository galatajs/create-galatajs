import { Package } from "./package";

export const createHttpPackage = (): Package => {
  return {
    name: "http",
    configName: "needsHttp",
    files: {
      packageJson: {
        dependencies: {
          typescript: {
            "@galatajs/http": "^0.1.1",
          },
          commonjs: {
            "@galatajs/http": "^0.1.1",
          },
          es6: {
            "@galatajs/http": "^0.1.1",
          },
        },
      },
      main: {
        imports: {
          typescript: ['import { createHttpServer } from "@galatajs/http"'],
          es6: ['import { createHttpServer } from "@galatajs/http"'],
          commonjs: ['const { createHttpServer } = require("@galatajs/http")'],
        },
        registers: {
          typescript: ["app.register(createHttpServer())"],
          es6: ["app.register(createHttpServer())"],
          commonjs: ["app.register(createHttpServer())"],
        },
      },
      examples: [
        {
          name: "product",
          unique: true,
          fileName: "product.router",
          moduleRegisters: {
            imports: {
              typescript: ["import { ProductRouter } from './product.router'"],
              es6: ["import { ProductRouter } from './product.router'"],
              commonjs: [
                'const { ProductRouter } = require("./product.router")',
              ],
            },
            registers: {
              typescript: ["ProductRouter"],
              es6: ["ProductRouter"],
              commonjs: ["ProductRouter"],
            },
          },
          imports: {
            typescript: [
              'import { createRouter, Request, Response } from "@galatajs/http"',
              'import { OnAppStarted } from "@galatajs/app"',
              'import { ProductService } from "./product.service"',
              'import { Product } from "./product.entity"',
            ],
            es6: ['import { createRouter } from "@galatajs/http"'],
            commonjs: ['const { createRouter } = require("@galatajs/http")'],
          },
          body: {
            typescript: [
              "export class ProductRouter implements OnAppStarted {",
              "  private productService: ProductService;",
              "  constructor(params :  { productService: ProductService }) {",
              "    this.productService = params.productService;",
              "  }",
              "  onAppStarted() : void {",
              "    this.init();",
              "  }",
              "  private init() : void {",
              "    const router = createRouter({ prefix: 'products' });",
              "    router.post('create', this.createProduct.bind(this));",
              "    router.get(':id', this.getProduct.bind(this));",
              "  };",
              "  private async createProduct(req : Request, res : Response) : Promise<void> {",
              "    const product = await this.productService.createProduct(req.body);",
              "    res.successData<Product>('Product successfully created', product);",
              "  }",
              "  private async getProduct(req : Request, res : Response) : Promise<void> {",
              "    const product = await this.productService.getProductById(req.params.id);",
              "    res.successData<Product>('Product successfully retrieved', product);",
              "  }",
              "}",
            ],
            es6: [
              "export class ProductRouter {",
              "  #productService;",
              "  constructor({ productService }) {",
              "    this.#productService = productService;",
              "  }",
              "  onAppStarted() {",
              "    this.#init();",
              "  }",
              "  #init() {",
              "    const router = createRouter({ prefix: 'products' });",
              "    router.post('create', this.#createProduct.bind(this));",
              "    router.get(':id', this.#getProduct.bind(this));",
              "  };",
              "  async #createProduct(req, res) {",
              "    const product = await this.#productService.createProduct(req.body);",
              "    res.successData('Product successfully created', product);",
              "  }",
              "  async #getProduct(req, res) {",
              "    const product = await this.#productService.getProductById(req.params.id);",
              "    res.successData('Product successfully retrieved', product);",
              "  }",
              "}",
            ],
            commonjs: [
              "class ProductRouter {",
              "  #productService;",
              "  constructor({ productService }) {",
              "    this.#productService = productService;",
              "  }",
              "  onAppStarted() {",
              "    this.#init();",
              "  }",
              "  #init() {",
              "    const router = createRouter({ prefix: 'products' });",
              "    router.post('create', this.#createProduct.bind(this));",
              "    router.get(':id', this.#getProduct.bind(this));",
              "  };",
              "  async #createProduct(req, res) {",
              "    const product = await this.#productService.createProduct(req.body);",
              "    res.successData('Product successfully created', product);",
              "  }",
              "  async #getProduct(req, res) {",
              "    const product = await this.#productService.getProductById(req.params.id);",
              "    res.successData('Product successfully retrieved', product);",
              "  }",
              "}",
            ],
          },
          exports: {
            typescript: [],
            es6: [],
            commonjs: ["ProductRouter"],
          },
        },
      ],
    },
  };
};
