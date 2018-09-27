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
  // @Output() sendDataToChild = new EventEmitter();
  loginForm = this.fb.group({
    EmailId: [''],
    Password: ['']
  });

  constructor(private fb: FormBuilder, private appdataservice: LoginService,private router: Router, private localStorage: LocalStorageService) { }
  ngOnInit() {
  }

  onSubmit() {
    this.appdataservice.obtainToken(this.loginForm.value).subscribe(data => {
      this.localStorage.store("token", data["token"]);
      this.localStorage.store("email", this.loginForm.value.EmailId);
      this.router.navigate(['/workspaces']);
    }, err => {
      console.log(err);
      if(err == "401") {
        this.error = "Invalid Username/Password"
      } else if(err == "500") {
        this.error = "Oops!!! Something Went Wrong"
      }
    });
  }
}
