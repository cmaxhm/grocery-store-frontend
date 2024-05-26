import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Product } from '../../interfaces/product.interface';
import { SharedModule } from '../../shared.module';
import { initialCartState } from '../../state/app.reducers';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<Product>;
  let fixture: ComponentFixture<TableComponent<Product>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [SharedModule],
      providers: [provideMockStore({ initialState: { cart: initialCartState } })]
    });
    fixture = TestBed.createComponent(TableComponent<Product>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
