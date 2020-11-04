import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Liga',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes...'
  }

  userSettings: UserSettings = {...this.originalUserSettings}

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log("Submitted!", form.valid);
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid)
  }

}
