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

  constructor(private http: Http,private  httpclient: HttpClient) { }

  // getAll() {
  //   return this.http.get(API_URL + "/applications")
  //     .pipe(map(response => {
  //       const applications = response.json();
  //       return applications.map((application) => new Application(application));
  //     }))
  //     .pipe(catchError(this.handleError));
  // }

  getAll() {
    return this.httpclient.get<Application []>(API_URL + "/applications")
    .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  // getById(id: number) {
  //   return this.http.get(API_URL + `/applications/${id}`)
  //     .pipe(map(response => {
  //       return new Application(response.json());
  //     }))
  //     .pipe(catchError(this.handleError));
  // }

  getById(id: number) {
    return this.httpclient.get<Application>(API_URL + `/applications/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  // public addApplication(application: Application): Observable<Application> {
  //   console.log(application);
  //   return this.http
  //     .post(API_URL + '/applications', application)
  //     .pipe(map(response => {
  //       return new Application(response.json());
  //     }))
  //     .pipe(catchError(this.handleError));
  // }

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
    var _url="http://172.23.238.165:5000/api/onboarding/bot/verify"
    return this.httpclient.post(_url, loginViewModel, httpOptions)
    .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  // private handleError(error: Response | any) {
  //   console.log('ApiService::handleError', error);
  //   return throwError(error);
  // }
}
