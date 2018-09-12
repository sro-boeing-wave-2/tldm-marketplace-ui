import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean=true;
  // @Output() sendDataToChild = new EventEmitter();
  loginForm = this.fb.group({
    Username: [''],
    Password: [''],
    WorkspaceName: [''],
  });

  constructor(private fb: FormBuilder, private appdataservice: LoginService,private router: Router) { }
  ngOnInit() {
  }

  onSubmit() {
    this.appdataservice.obtainToken(this.loginForm.value).subscribe(data => {
      this.appdataservice.AccessToken=data['token'];
      console.log(this.loginForm.value);
      console.log(this.loginForm.value.Username);
      this.appdataservice.storeUsername(this.loginForm.value.Username);
      console.log(data);
      this.router.navigate(['/allchannels']);
    });
  }
}
