import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {
  transform(value: Product[], ...args: string[]): Product[] {
    return value.filter((product: Product) => product.name.toLowerCase().includes(args[0].trim().toLowerCase()));
  }
}
