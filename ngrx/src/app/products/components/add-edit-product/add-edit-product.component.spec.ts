import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IProduct } from '../../models/product.model';
import { AddEditProductComponent } from './add-edit-product.component';


describe('AddEditProductComponent', () => {
  let component: AddEditProductComponent;
  let fixture: ComponentFixture<AddEditProductComponent>;
  const mockedDialogRef = {
    close: () => {},
  };
  const product: IProduct = {
    id: 1,
    name: 'product',
    price: 12,
    thumbnail: 'tea.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditProductComponent],
      imports: [
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: product },
        {
          provide: MatDialogRef,
          useValue: mockedDialogRef,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.spyOn(global.Math, 'random').mockReturnValue(4);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save product with provided id', () => {
    const dialog = jest.spyOn(component['_dialog'], 'close');
    component.save();
    expect(dialog).toHaveBeenCalledWith(product);
  });

  it('should save product with random id', () => {
    const dialog = jest.spyOn(component['_dialog'], 'close');
    const expectedProduct = {
      ...product,
      id: 4001
    };
    component.data = undefined as any;
    component.save();
    expect(dialog).toHaveBeenCalledWith(expectedProduct);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
