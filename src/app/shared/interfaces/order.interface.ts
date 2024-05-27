import { Product } from './product.interface';
import { User } from './user.interface';

export interface Order {
  id: string;
  user: Partial<User>;
  date: string;
  products: Product[];
}
