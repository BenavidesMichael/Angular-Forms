import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
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
  progress: number = 0;
  message: string = '';

  percentageProgressBar = 0;
  showProgressBar = false;
  selectedFile!: File;
  imageSrc: string = '';

  constructor(
    private router: Router,
    private myFormBuilder: FormBuilder,
    private basicFormService: BasicFormService) {
    this.InitForm(); // /!\ Always in constructor.
  }

  ngOnInit(): void {
    this.generateData();
    // this.nameField?.valueChanges.subscribe(x => console.log(x));
    // this.myFormGroup?.valueChanges.subscribe(x => console.log(x));
  }


  generateData() {
    this.categories = [
      { id: 1, name: 'category 1' },
      { id: 2, name: 'category 2' },
      { id: 3, name: 'category 3' },
      { id: 4, name: 'category 4' },
    ];

    this.tags = [
      { id: 1, name: 'tag 1' },
      { id: 2, name: 'tag 2' },
      { id: 3, name: 'tag 3' },
      { id: 4, name: 'tag 4' },
    ];

    this.genders = [
      'Man', 'Woman', 'Other',
    ];

    this.zones = [
      'Zone 1', 'Zone 2', 'Zone 3',
    ]
  }


  private InitForm() {
    // this.myFormGroup = this.myFormBuilder.group({
    //   fullName: this.myFormBuilder.group({
    //     name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
    //     lastname: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
    //   }),
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['',[Validators.required]],
    //   color: [''],
    //   logo: ['',[Validators.required]],
    //   date: [''],
    //   age: [30, [Validators.required, Validators.min(18), Validators.max(100)]],
    //   // select
    //   category: [''],
    //   tag: [''],
    //   // checkbox Radio
    //   agree: [false, Validators.requiredTrue],
    //   gender: [''],
    //   zone: [''],
    //   password: ['', MyValidators.validPassword],// simple valid field
    //   confirmPassword: ['', Validators.required],
    // },{
    //   // error attached to forms not to field.
    //   // validation de group
    //   validators: MyValidators.matchPasswords
    // });

    this.myFormGroup = this.myFormBuilder.group({
      fullName: this.myFormBuilder.group({
        name: ['Michael'],
        lastname: ['Benavides']
      }),
      email: ['test@test.com'],
      phone: ['0987654321'],
      color: ['#7b7474'],
      logo: [''],
      date: [''],
      age: [30],
      category: [''],
      tag: [''],
      agree: [false],
      gender: [''],
      zone: [''],
      password: ['123AZE'],
      confirmPassword: ['123AZE'],
    });

  }

  // get myForm(){
  //   return this.myFormGroup.controls;
  // }

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

  get logoField() {
    return this.myFormGroup.get('logo');
  }


  getNameValue() {
    console.log(this.nameField);
  }

  save() {
    if (!this.myFormGroup.valid) {
      this.myFormGroup.markAllAsTouched();
      return;
    }
    const model = this.parseModel(this.myFormGroup.value);
    const formData = this.createFormModel(model);
    this.addUser(formData);
  }

  createFormModel(model: UserFormCreate){
    const formData = new FormData();
    formData.append('firstName', model.firstName);
    formData.append('lastName', model.lastName);
    formData.append('fullName', model.fullName);
    formData.append('age', model.age.toString());
    formData.append('logo', this.selectedFile, this.selectedFile?.name);

    for (const index in model.tag) {
      formData.append(`tags[${index}].id`, model.tag[index].id.toString());
      formData.append(`tags[${index}].name`,  model.tag[index].name);
    }
    formData.append(`category.id`, model.category.id.toString());
    formData.append(`category.name`, model.category.name);

    var datestr = (new Date(model.date)).toUTCString();
    formData.append("date", datestr);

    formData.append(`email`, model.email);
    formData.append(`password`, model.password);
    formData.append(`phone`, model.phone);
    formData.append(`color`, model.color);
    formData.append(`gender`, model.gender);
    formData.append(`agree`, model.agree.toString());

    return formData;
  }


  parseModel(formValue: any) {
    const model: UserFormCreate = {
      firstName: formValue.fullName.name,
      lastName: formValue.fullName.lastname,
      fullName: `${formValue.fullName.name} ${formValue.fullName.lastname}`,
      age: formValue.age,
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


  onFileChange(event: any) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    if (event?.target?.files && event?.target?.files?.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }


  addUser(formData: FormData) {
    this.basicFormService.addData(formData).subscribe(
      event => console.log('Data Save'),
      error => console.log(error),
    );
  }

}
