import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {

    // return this.http.post('https://putsreq.com/Is7YkorE10oXzX0J2Mfw', userSettings);

    // response.status = 400;
    // response.body = { errorMessage: 'Some Error goes here ...'};

    return of(userSettings);
  }
}
