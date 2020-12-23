import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('default text');
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('');
  dateField = new FormControl(new Date());
  ageField = new FormControl(30);

  // select
  categoryField = new FormControl();
  tagField = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.nameField.valueChanges.subscribe(x => console.log(x));
  }

  getNameValue() {
    console.log(this.nameField);
  }


}
