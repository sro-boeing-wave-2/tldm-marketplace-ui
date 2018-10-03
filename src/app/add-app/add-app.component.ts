import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Application} from '../application'
import { ApplicationDataService } from '../application-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css'],
  providers: [ApplicationDataService]

})
export class AddAppComponent implements OnInit {
  emailNotVaild: string;
  nameNotValid: string;
  developerNotValid: string;
  appUrlNotValid: string;
  flag: number=1;

  newApplication: Application = new Application();

  applications: Application[] = [];
  regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;


  @Output()
  add: EventEmitter<Application> = new EventEmitter()

  constructor(private applicationDataService: ApplicationDataService, private router: Router) { }

  ngOnInit() {
  }

  addApplication() {
    if(this.newApplication.name == undefined) {
      this.nameNotValid = "* App Name Cannot Be Null";
      this.flag=0;
    }
    if(this.newApplication.emailId == undefined || this.regex.test(this.newApplication.emailId) == false) {
      this.emailNotVaild = "* Email Not Valid";
      this.flag=0;
    }
    if(this.newApplication.developer == undefined) {
      this.developerNotValid = "* Developer Name Cannot Be Null";
      this.flag=0;
    }
    if(this.newApplication.appUrl == undefined) {
      this.appUrlNotValid = "* App Url Cannot Be Null";
      this.flag=0;
    }
    if(this.flag == 0) {
      return;
    }
    console.log("Not Coming Here");
    this.applicationDataService
      .addApplication(this.newApplication)
      .subscribe(
        (newApplication) => {
          this.applications = this.applications.concat(newApplication);
          this.applicationDataService.verifyDeveloperEmail(this.newApplication.emailId).subscribe(data => {
            this.newApplication = new Application();
            this.router.navigate(['']);
          });
        }
      );
  }
}
