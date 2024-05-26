import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Product } from '../../interfaces/product.interface';
import { SharedModule } from '../../shared.module';
import { initialCartState } from '../../state/app.reducers';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const productMock: Product = {
    id: "1",
    name: 'Product 1',
    price: 100,
    description: 'Description 1',
    quantity: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [SharedModule],
      providers: [provideMockStore({ initialState: { cart: initialCartState } })]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = productMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
