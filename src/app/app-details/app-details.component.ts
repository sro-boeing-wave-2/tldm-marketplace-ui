import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApplicationDataService } from '../application-data.service';
import { Application } from '../application';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {
  selectedId;
  application: Application;

  constructor(private activatedroute: ActivatedRoute, private applicationdataservice: ApplicationDataService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params: ParamMap) => {
      this.selectedId = params.get('id');
    });
    this.applicationdataservice.getById(this.selectedId).subscribe(data => {
      this.application=data; 
      this.localStorage.store("bot-email-id", data.emailId);
      this.localStorage.store("name", data.name);
    });
  }

  install(id) {
    this.localStorage.store("appId", id);
    if(this.localStorage.retrieve("token") != undefined && this.localStorage.retrieve("workspacename") != undefined) {
      this.router.navigate(['/channels']);
    } else{
      this.router.navigate(['login']);
    }
  }
}
