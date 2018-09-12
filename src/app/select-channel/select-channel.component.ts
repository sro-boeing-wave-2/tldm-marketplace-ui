import { Component, OnInit, Input } from '@angular/core';
import { ChatDataService } from '../chat-data.service';
import { Channel } from '../channel';
import { User } from '../user';
import { ApplicationDataService } from '../application-data.service';
import { Router } from '@angular/router';
import { UserChannel } from '../user-channel';

@Component({
  selector: 'app-select-channel',
  templateUrl: './select-channel.component.html',
  styleUrls: ['./select-channel.component.css']
})
export class SelectChannelComponent implements OnInit {
  workspaceName: string = "TLDM";
  userName: string = "rishabh120296@gmail.com";
  channels: Channel[];
  channelSelected;
  appId=7;
  application;
  botUser: User = {
    id: "60681125-e117-4bb2-9287-eb840c4cf67e",
    firstName: "Bot",
    lastName: "User",
    emailId: "tldm-github-bot@gmail.com",
  };

  botUserChannel: UserChannel = {
    id: "101010101010101010101010",
    userId: "60681125-e117-4bb2-9287-eb840c4cf67e",
    firstName: "Bot",
    lastName: "User",
    emailId: "tldm-github-bot@gmail.com",
  };

  constructor(private router: Router, private _chatdataservice: ChatDataService, private _appicationdataservice: ApplicationDataService) { }

  ngOnInit() {
    this._chatdataservice.getChannels(this.workspaceName, this.userName).subscribe(data => this.channels = data);
    this._appicationdataservice.getById(this.appId).subscribe(data => this.application = data);
  }

  addBot() {
    this._chatdataservice.addBotToWorkspace(this.workspaceName, this.botUser).subscribe();
    for (let selectedChannel of this.channelSelected) {
      this._chatdataservice.addBot(selectedChannel, this.botUserChannel).subscribe();
    }
    this.router.navigate([this.application.appUrl]);
  }
}
