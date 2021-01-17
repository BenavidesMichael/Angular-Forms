import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from '../../../Validators/password.validator';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';
import { UserFormCreate } from '../../models/user-form-create';
import { BasicFormService } from '../../services/basic-form.service';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  myFormGroup: FormGroup = new FormGroup({});
  categories: Category[] = [];
  tags: Tag[] = [];
  genders: string[] = [];
  zones: string[] = [];

  constructor(
    private router: Router,
    private myFormBuilder: FormBuilder,
    private  basicFormService: BasicFormService) {
      this.InitForm(); // /!\ Always in constructor.
   }

  ngOnInit(): void {
    this.generateData();
    // this.nameField?.valueChanges.subscribe(x => console.log(x));
    // this.myFormGroup?.valueChanges.subscribe(x => console.log(x));
  }


  generateData() {
    this.categories = [
      {id: 1, name: 'category 1'},
      {id: 2, name: 'category 2'},
      {id: 3, name: 'category 3'},
      {id: 4, name: 'category 4'},
    ];

    this.tags = [
      {id: 1, name: 'category 1'},
      {id: 2, name: 'category 2'},
      {id: 3, name: 'category 3'},
      {id: 4, name: 'category 4'},
    ];

    this.genders = [
      'Man', 'Woman', 'Other',
    ];

    this.zones = [
      'Zone 1', 'Zone 2', 'Zone 3',
    ]
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
    console.log(this.myFormGroup);

    if (!this.myFormGroup.valid) {
      this.myFormGroup.markAllAsTouched();
      return;
    }

    const model = this.parseModel(this.myFormGroup.value)
    this.addUser(model);
  }


  parseModel(formValue: any) {
    const model: UserFormCreate = {
      firstName: formValue.fullName.name,
      lastName: formValue.fullName.lastname,
      fullName: `${formValue.fullName.name} ${formValue.fullName.lastname}`,
      age: formValue.age,
      logo: formValue.logo,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      color: formValue.color,
      date: formValue.date,
      category: formValue.category,
      tag: formValue.tag,
      gender: formValue.gender,
      agree: formValue.agree,
    }

    return model;
  }



  addUser(model: UserFormCreate) {
    this.basicFormService.addData(model).subscribe(
      x => {
        console.log('Data Save');
        this.router.navigate(['/basic-form']);
      },
      error => console.log(error),
    );
  }

}
