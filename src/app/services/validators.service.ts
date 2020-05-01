import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public form: FormGroup;

  constructor() { }

  public setForm(form: FormGroup) {
    this.form = form;
  }

  public clearForm() {
    this.form = null;
  }

  public clear(form: FormGroup) {
    // tslint:disable-next-line: forin
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }
  public clear2() {
    // tslint:disable-next-line: forin
    for (const key in this.form.controls) {
      this.form.get(key).clearValidators();
      this.form.get(key).updateValueAndValidity();
    }
  }

  public getErrorMessage(key): string {
    if (this.form.get(key).errors.required) {
      const newKey = this.convertName(key);
      return `Field ${newKey} is required`;
    }
    if (this.form.get(key).errors.email) {
      return 'Not a valid email';
    }
    if (this.form.get(key).errors.minlength) {
      return 'The password must be at least 6 characters';
    }
    if (this.form.get(key).errors.server) {
      return this.form.get(key).errors.server;
    }
  }

  public handlerError(error) {
    if (error.error.code === 422) {
      if (error.error.errors) {
        // tslint:disable-next-line: forin
        for (const e in error.error.errors) {
          this.form.get(e).setErrors({ server: error.error.errors[e][0] });
        }
      }
    }
  }

  public isInvalid(key) {
    return this.form.get(key).invalid;
  }

  public convertName(name) {
     return name.replace(/_/g, ' ');
  }
}
