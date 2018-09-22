import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private onboard_url = environment.onboardUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient, private localStoarge: LocalStorageService) { }
  public obtainToken(credentials) {
    return this.http.post(`${this.onboard_url}/login`, credentials).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  public getAllWorkspaces() {
    let email= this.localStoarge.retrieve("email");
    return this.http.get(`${this.onboard_url}/${email}`).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

}
