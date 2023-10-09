import { AllResources } from '../types';
import { PRODUCT, PRODUCT_VARIANT, USER, USER_PROVIDER } from './names';

export const userIncludes: any = {
  products: true,
  providers: true,
};

export const productIncludes: any = {
  variants: true,
};

export const defaultIncludesByResource: Record<
  AllResources,
  typeof userIncludes | typeof productIncludes
> = {
  [PRODUCT]: productIncludes,
  [PRODUCT_VARIANT]: {},
  [USER]: userIncludes,
  [USER_PROVIDER]: {},
};
