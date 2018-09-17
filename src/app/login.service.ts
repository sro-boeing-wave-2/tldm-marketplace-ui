import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private onboard_url = environment.onboardUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private localStoarge: LocalStorageService) { }
  public obtainToken(credentials) {
    return this.http.post(`${this.onboard_url}/login`, credentials, this.httpOptions);
  }

  public getAllWorkspaces() {
    let email= this.localStoarge.retrieve("email");
    return this.http.get(`${this.onboard_url}/${email}`, this.httpOptions);
  }

}
