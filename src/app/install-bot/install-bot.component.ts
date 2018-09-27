import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from '../application-data.service';
import { Channel } from '../channel';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-install-bot',
  templateUrl: './install-bot.component.html',
  styleUrls: ['./install-bot.component.css']
})
export class InstallBotComponent implements OnInit {

  botInstalledChannels: Channel[];
  chatUIUrl: string;
  botName: string;

  constructor(private appservice: ApplicationDataService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.botName = this.localStorage.retrieve("name");
    this.chatUIUrl =`${environment.chatUIUrl}?workspace=${this.localStorage.retrieve('workspacename')}`;
    this.appservice.getSelectedChannelDetails().subscribe(channels => this.botInstalledChannels = channels);
  }
}
