import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean=true;
  error: string;
  emailValid: string;
  loginForm = this.fb.group({
    EmailId: [''],
    Password: ['']
  });
  regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;

  constructor(private fb: FormBuilder, private appdataservice: LoginService,private router: Router, private localStorage: LocalStorageService) { }
  ngOnInit() {
  }

  onSubmit() {
    if(this.regex.test(this.loginForm.value.EmailId) == false){
      this.error="* Invalid email";
      return;
    }
    this.appdataservice.obtainToken(this.loginForm.value).subscribe(data => {
      this.localStorage.store("token", data["token"]);
      this.localStorage.store("email", this.loginForm.value.EmailId);
      this.router.navigate(['/workspaces']);
    }, err => {
      if(err == "401") {
        this.error = "* Invalid username/password"
      } else if(err == "500") {
        this.error = "Oops!!! Something went wrong"
      }
    });
  }
}
