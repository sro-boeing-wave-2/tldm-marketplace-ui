import { Injectable } from '@angular/core';
import { Application } from './application';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

const API_URL = environment.apiUrl;


@Injectable()

export class ApplicationDataService {

  private _url = environment.onboardUrl;
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
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var loginViewModel = {
      "emailId": email,
      "password": "Bot",
      "workspace": "Bot"
    };
    var _url=`${this._url}/bot/verify`
    return this.httpclient.post(_url, loginViewModel, httpOptions)
    .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }
}
