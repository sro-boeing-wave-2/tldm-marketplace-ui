import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.css']
})
export class WorkspaceListComponent implements OnInit {
  workspaces;
  constructor(private loginservice: LoginService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.loginservice.getAllWorkspaces().subscribe(data => this.workspaces = data);
  }

  getChannels(workspace) 
  {
    this.localStorage.store("workspace", workspace);
    this.router.navigate(['channels']);
  }
}
