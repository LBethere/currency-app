import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
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
  postError = false;
  postErrorMessage = '';
  SubscriptionTypes: Observable<string[]>;

  singleModel = "On";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.SubscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onSubmit(form: NgForm){
    console.log("Submitted!", form.valid);
    console.log(this.userSettings)

    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => {console.log('success: ', result)},
        error => {this.onHttpError(error);}
      );
    }
    else {
      this.postError = true;
      this.postErrorMessage = 'Form is not valid';
    }

  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid)
  }

}
