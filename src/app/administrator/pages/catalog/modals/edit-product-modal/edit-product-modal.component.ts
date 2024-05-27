import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../../../shared/services/products.service';
import { CatalogComponent } from '../../catalog.component';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})
export class EditProductModalComponent implements OnInit, OnDestroy {
  /**
   * The form to edit the product.
   */
  public form: FormGroup;

  /**
   * Indicates if the edit product button is disabled.
   */
  public isEditProductButtonDisabled: boolean;

  /**
   * The destroy subject. Used to avoid memory leaks.
   *
   * @private
   */
  private destroy$: Subject<void>;

  constructor(
    @Inject(NZ_MODAL_DATA) public nzData: { parentComponent: CatalogComponent, product: Product },
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) {
    this.isEditProductButtonDisabled = false;
    this.destroy$ = new Subject();
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]]
    });
  }

  /**
   * Sets the form values when the component initializes.
   */
  public ngOnInit(): void {
    if (this.nzData.product) this.form.patchValue(this.nzData.product);
  }

  /**
   * Emits the destroy subject to avoid memory leaks.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Closes the modal.
   */
  public cancelEditProductForm(): void {
    this.nzModalRef.close();
  }

  /**
   * Edits a product and closes the modal on success.
   */
  public editProduct(): void {
    this.isEditProductButtonDisabled = true;

    this.productsService
      .editProduct(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product: Product) => {
          this.nzData.parentComponent.products = this.nzData.parentComponent.products.map((innerProduct: Product) => {
            if (innerProduct.id === product.id) return product;

            return innerProduct;
          });

          this.nzMessageService.success('Producto editado correctamente.');
          this.nzModalRef.close();
        },
        error: () => {
          this.isEditProductButtonDisabled = false;

          this.nzMessageService.error('Hubo un error al editar el producto, por favor intenta de nuevo.');
        }
      });
  }
}
