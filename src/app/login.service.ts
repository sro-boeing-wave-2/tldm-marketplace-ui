import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  AccessToken: string;
  private loggedEmailAddress = new BehaviorSubject<string>("");
  private allWorkspaces = new BehaviorSubject<string[]>([""]);

  currentEmail = this.loggedEmailAddress.asObservable();
  workspaces = this.allWorkspaces.asObservable();
  constructor(private http: HttpClient) { }
  public obtainToken(credentials) {
    return this.http.post("http://172.23.238.206:5000/api/onboard/login", credentials);
  }

  public getValues(httpOptions) {
    return this.http.get('http://localhost:5000/api/values', httpOptions);
  }

  public storeUsername(email: string) {
    this.loggedEmailAddress.next(email);
    console.log(email);
  }

  public storeWorkspace(workspaces: string[]) {
    this.allWorkspaces.next(workspaces);
  }
}
