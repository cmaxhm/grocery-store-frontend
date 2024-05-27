import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../shared/services/products.service';
import { EditProductModalComponent } from './modals/edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  /**
   * The products list.
   */
  public products: Product[];

  /**
   * The number of products.
   */
  public totalProducts: number;

  /**
   * The form to add a new product.
   */
  public form: FormGroup;

  /**
   * Indicates if the add product form is displayed.
   */
  public isAddProductFormDisplayed: boolean;

  /**
   * Indicates if the add product button is displayed.
   */
  public isAddProductButtonDisabled: boolean;

  /**
   * The destroy subject. Used to avoid memory leaks.
   *
   * @private
   */
  private destroy$: Subject<void>;

  constructor(
    private productsService: ProductsService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder,
    private nzModalService: NzModalService
  ) {
    this.products = [];
    this.totalProducts = 0;
    this.isAddProductFormDisplayed = false;
    this.isAddProductButtonDisabled = false;
    this.destroy$ = new Subject();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]]
    });
  }

  /**
   * Prepares the component data to display.
   */
  public ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Emits the destroy subject to avoid memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Gets the products list.
   */
  public getProducts(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.totalProducts = products.length;
        },
        error: () => {
          this.nzMessageService.error('Hubo un error al cargar los productos. Por favor, intenta nuevamente.');
        }
      });
  }

  /**
   * Cancels the add product form, resetting the form and hiding it.
   */
  public cancelAddProductForm(): void {
    this.isAddProductFormDisplayed = false;

    this.form.reset({
      name: '',
      description: '',
      price: '',
      quantity: ''
    });
  }

  /**
   * Adds a new product to the catalog.
   */
  public addProduct(): void {
    this.isAddProductButtonDisabled = true;
    const product: Partial<Product> = {
      name: this.form.value.name.trim(),
      description: this.form.value.description.trim(),
      price: this.form.value.price,
      quantity: this.form.value.quantity
    };

    if (product.quantity! % 1 !== 0) {
      this.isAddProductButtonDisabled = false;

      this.nzMessageService.error('La cantidad del producto no puede ser un número decimal.');

      return;
    }

    this.productsService
      .addProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isAddProductFormDisplayed = false;
          this.isAddProductButtonDisabled = false;

          this.getProducts();
          this.form.reset({
            name: '',
            description: '',
            price: '',
            quantity: ''
          });
          this.nzMessageService.success('Producto agregado exitosamente.');
        },
        error: () => {
          this.isAddProductButtonDisabled = false;

          this.nzMessageService.error('Hubo un error al agregar el producto. Por favor, intenta nuevamente.');
        }
      });
  }

  /**
   * Edits a product from the catalog opening a modal.
   *
   * @param product The product to edit.
   */
  public editProduct(product: Product): void {
    this.nzModalService.create({
      nzTitle: 'Editar producto',
      nzContent: EditProductModalComponent,
      nzData: { parentComponent: this, product }
    });
  }

  /**
   * Deletes a product from the catalog.
   *
   * @param productId The product ID to delete.
   */
  public deleteProduct(productId: string): void {
    this.productsService
      .deleteProduct(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getProducts();
          this.nzMessageService.success('Producto eliminado exitosamente.');
        },
        error: () => {
          this.nzMessageService.error('Hubo un error al eliminar el producto. Por favor, intenta nuevamente.');
        }
      });
  }
}
