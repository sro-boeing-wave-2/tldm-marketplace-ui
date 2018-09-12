import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private localStoarge: LocalStorageService) { }
  public obtainToken(credentials) {
    return this.http.post("http://172.23.238.165:7000/onboard/login", credentials, this.httpOptions);
  }

  public getValues(httpOptions) {
    return this.http.get('http://localhost:5000/api/values', httpOptions);
  }

  public getAllWorkspaces() {
    let email= this.localStoarge.retrieve("email");
    return this.http.get(`http://172.23.238.165:7000/onboard/${email}`, this.httpOptions);
  }

}
