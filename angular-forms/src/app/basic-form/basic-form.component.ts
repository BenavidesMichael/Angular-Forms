import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../Validators/password.validator';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  myFormGroup: FormGroup = new FormGroup({});

  constructor(private myFormBuilder: FormBuilder) {
    // /!\ Always in constructor.
    this.InitForm();
   }

  ngOnInit(): void {
    // this.nameField?.valueChanges.subscribe(x => console.log(x));
    // this.myFormGroup?.valueChanges.subscribe(x => console.log(x));
  }


  private InitForm() {
    this.myFormGroup = this.myFormBuilder.group({
      fullName: this.myFormBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        lastname: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required]],
      color: [''],
      date: [''],
      age: [30, [Validators.required, Validators.min(18), Validators.max(100)]],
      // select
      category: [''],
      tag: [''],
      // checkbox Radio
      agree: [false, Validators.requiredTrue],
      gender: [''],
      zone: [''],
      password: ['', MyValidators.validPassword],// simple valid field
      confirmPassword: ['', Validators.required],
    },{
      // error attached to forms not to field.
      // validation de group
      validators: MyValidators.matchPasswords
    });

  }

  // NameField
  get nameField() {
    return this.myFormGroup?.get('fullName')?.get('name');
  }

  get lastnameField() {
    return this.myFormGroup?.get('fullName.lastname');
  }

  get isNameFieldIsValid() {
    return this.nameField?.touched && this.nameField.valid
  }

  get isNameFieldIsInValid() {
    return this.nameField?.touched && this.nameField.valid
  }
    // End - NameField


  get emailField() {
    return this.myFormGroup.get('email');
  }

  get phoneField() {
    return this.myFormGroup.get('phone');
  }

  get colorField() {
    return this.myFormGroup.get('color');
  }

  get dateField() {
    return this.myFormGroup.get('date');
  }

  get ageField() {
    return this.myFormGroup.get('age');
  }

  get categoryField() {
    return this.myFormGroup.get('category');
  }

  get tagField() {
    return this.myFormGroup.get('tag');
  }

  get agreeField() {
    return this.myFormGroup.get('agree');
  }

  get genderField() {
    return this.myFormGroup.get('gender');
  }

  get zoneField() {
    return this.myFormGroup.get('zone');
  }

  get passwordField() {
    return this.myFormGroup.get('password');
  }

  get confirmPasswordField() {
    return this.myFormGroup.get('confirmPassword');
  }



  getNameValue() {
    console.log(this.nameField);
  }

  save() {
    if (!this.myFormGroup.valid) {
      this.myFormGroup.markAllAsTouched();
      return;
    }

    console.log(this.myFormGroup);
  }

}
