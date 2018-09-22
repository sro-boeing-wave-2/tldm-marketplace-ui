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
  application;

  constructor(private activatedroute: ActivatedRoute, private applicationdataservice: ApplicationDataService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe((params: ParamMap) => {
      this.selectedId = params.get('id');
    });
    this.applicationdataservice.getById(this.selectedId).subscribe(data => {
      this.application=data; 
      this.localStorage.store("bot-email-id", data.emailId);
    });
  }

  install(id) {
    this.localStorage.store("appId", id);
    console.log(this.localStorage.retrieve("appId"));
    this.router.navigate(['login']);
  }

}
