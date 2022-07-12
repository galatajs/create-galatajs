import { createRule, RuleResult } from "@istanbul/rules";
import { ErrorDataResult } from "@istanbul/core";
import { ValidationError } from "../common/errors/validation.error";
import { Product } from "./product.model";

const productNameValidator = (name: string): RuleResult<ValidationError> => {
  return name.length < 3
    ? {
        success: false,
        error: new ValidationError("name", "Name is too short"),
      }
    : { success: true };
};

const productStockValidator = (stock: number): RuleResult<ValidationError> => {
  return stock < 10
    ? {
        success: false,
        error: new ValidationError("stock", "Stock is too short"),
      }
    : { success: true };
};

export const validateProduct = (
  name: string,
  price: number,
  stock: number
): ErrorDataResult<ValidationError[]> | undefined => {
  const result = createRule<ValidationError>()
    .start(productNameValidator)
    .and(productStockValidator)
    .end(name, price);
  return result.success
    ? undefined
    : new ErrorDataResult<ValidationError[]>("Validation Error", result.errors);
};
