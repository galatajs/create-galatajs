import { Package } from "./package";

export const createHttpPackage = (): Package => {
  return {
    name: "http",
    configName: "needsHttp",
    files: {
      packageJson: {
        dependencies: {
          typescript: {
            "@istanbul/http": "^0.0.5",
          },
          commonjs: {
            "@istanbul/http": "^0.0.5",
          },
          es6: {
            "@istanbul/http": "^0.0.5",
          },
        },
      },
      main: {
        imports: {
          typescript: ['import { createHttpServer } from "@istanbul/http"'],
          es6: ['import { createHttpServer } from "@istanbul/http"'],
          commonjs: ['const { createHttpServer } = require("@istanbul/http")'],
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
          fileName: "product.controller",
          imports: {
            typescript: [
              'import { createRouter, Request, Response } from "@istanbul/http"',
              'import { ProductService } from "./product.service"',
              'import { Product } from "./product.entity"',
            ],
            es6: [
              'import { createRouter } from "@istanbul/http"',
              'import { ProductService } from "./product.service"',
            ],
            commonjs: [
              'const { createRouter } = require("@istanbul/http")',
              'const { ProductService } = require("./product.service")',
            ],
          },
          body: {
            typescript: [
              "export const createProductController = ({productService}: {productService: ProductService}) : void => {",
              "  createRouter({ prefix: 'products' })",
              "    .post('create', async(req : Request, res : Response) : Promise<any> => {",
              "      const product = await productService.createProduct(req.body);",
              "      res.successData<Product>('Product successfully created', product);",
              "    })",
              "    .get(':id', async(req : Request, res : Response) : Promise<any> => {",
              "      const product = await productService.getProductById(req.params.id);",
              "      if(product === null) return res.notFound('Product not found');",
              "      res.successData<Product>('Product successfully fetched', product);",
              "    })",
              "}",
            ],
            es6: [
              "export const createProductController = ({productService}) => {",
              "  createRouter({ prefix: 'products' })",
              "    .post('create', async(req, res) => {",
              "      const product = await params.productService.createProduct(req.body);",
              "      res.successData('Product successfully created', product);",
              "    })",
              "    .get(':id', async(req, res) => {",
              "      const product = await params.productService.getProductById(req.params.id);",
              "      if(product === null) return res.notFound('Product not found');",
              "      res.successData('Product successfully fetched', products);",
              "    })",
              "}",
            ],
            commonjs: [
              "const createProductController = ({productService}) => {",
              "  createRouter({ prefix: 'products' })",
              "    .post('create', async(req, res) => {",
              "      const product = await params.productService.createProduct(req.body);",
              "      res.successData('Product successfully created', product);",
              "    })",
              "    .get(':id', async(req, res) => {",
              "      const product = await params.productService.getProductById(req.params.id);",
              "      if(product === null) return res.notFound('Product not found');",
              "      res.successData('Product successfully fetched', products);",
              "    })",
              "}",
            ],
          },
          exports: {
            typescript: [],
            es6: [],
            commonjs: ["createProductController"],
          },
        },
      ],
    },
  };
};
