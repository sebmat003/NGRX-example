import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export type FormControls<T> = {
  [key in keyof T]: T[key] extends TForm<any> | FormArray
    ? T[key]
    : Omit<AbstractControl, 'value'> & { value: T[key] };
};

export type TForm<T> = FormGroup & {
  controls: FormControls<T>;
};
