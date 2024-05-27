import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SharedModule } from '../../../../../shared/shared.module';
import { EditProductModalComponent } from './edit-product-modal.component';

describe('EditProductModalComponent', () => {
  let component: EditProductModalComponent;
  let fixture: ComponentFixture<EditProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductModalComponent],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        SharedModule
      ],
      providers: [
        NzModalService,
        {
          provide: NZ_MODAL_DATA,
          useValue: { parentComponent: {}, product: {} }
        },
        {
          provide: NzModalRef,
          useFactory: (nzModalService: NzModalService) => nzModalService.create({
            nzClosable: false,
            nzContent: EditProductModalComponent
          }),
          deps: [NzModalService]
        }
      ]
    });
    fixture = TestBed.createComponent(EditProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
