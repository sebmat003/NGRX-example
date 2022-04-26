import { IProduct } from './../../models/product.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PRODUCT_THUMBNAILS } from '../../product-thumbnails.const';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TForm } from 'src/app/_core/constants/form.type';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  public thumbnails = [...PRODUCT_THUMBNAILS];
  public form: TForm<Partial<IProduct>> = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    price: new FormControl(0, { validators: [Validators.required] }),
    thumbnail: new FormControl('', { validators: [Validators.required] }),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private _dialog: MatDialogRef<AddEditProductComponent>
  ) {}

  public ngOnInit(): void {
    if (this.data) {
      this.setForm();
    }
  }

  public setForm(): void {
    Object.entries(this.data).forEach(([key, value]) => {
      this.form.controls[key]?.setValue(value);
    });
  }

  public save(): void {
    const product: IProduct = {
      id: this.data ? this.data.id : Math.random() * 1000 + 1,
      ...this.form.getRawValue(),
    };
    this._dialog.close(product);
  }
}
