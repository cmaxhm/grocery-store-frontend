import { Product } from './product.interface';

export interface Order {
  id: string;
  products: Product[];
}
