import { Injectable } from '@angular/core';
import { Application } from './application';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Channel } from './channel';

const API_URL = environment.apiUrl;


@Injectable()

export class ApplicationDataService {

  private _url = environment.onboardUrl;
  private channels: Channel[];
  private selectedChannels = new BehaviorSubject(this.channels);
  public setSelectedChannelDetails(channels: Channel[]) {
    this.selectedChannels.next(channels);
  }

  public getSelectedChannelDetails() {
    return this.selectedChannels.asObservable();
  }

  constructor(private  httpclient: HttpClient) { }

  getAll() {
    return this.httpclient.get<Application []>(API_URL + "/applications")
    .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  getById(id: number) {
    return this.httpclient.get<Application>(API_URL + `/applications/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  public addApplication(application: Application): Observable<Application> {
    console.log(application);
    return this.httpclient
      .post<Application>(API_URL + '/applications', application)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  public verifyDeveloperEmail(email: string) {
    var loginViewModel = {
      "emailId": email,
      "password": "Bot",
      "workspace": "Bot"
    };
    var _url=`${this._url}/bot/verify`
    return this.httpclient.post(_url, loginViewModel)
    .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

}
