import { Component, OnInit, Input } from '@angular/core';
import { ChatDataService } from '../chat-data.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Channel } from '../channel';
import { User } from '../user';
import { ApplicationDataService } from '../application-data.service';
import { Router } from '@angular/router';
import { UserChannel } from '../user-channel';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-select-channel',
  templateUrl: './select-channel.component.html',
  styleUrls: ['./select-channel.component.css']
})
export class SelectChannelComponent implements OnInit {
  hubConnection: HubConnection;
  workspaceName: string = this.localStorage.retrieve("workspace");//"TLDM";
  userName: string = this.localStorage.retrieve("email"); //"rishabh120296@gmail.com";
  botEmailId: string = this.localStorage.retrieve("bot-email-id");
  channels: Channel[];
  channelSelected;
  appId=this.localStorage.retrieve("appId");
  application;
  botUser: User = {
    id: "60681125-e117-4bb2-9287-eb840c4cf67e",
    firstName: "Bot",
    lastName: "User",
    emailId: this.botEmailId
  };

  botUserChannel: UserChannel = {
    id: "101010101010101010101010",
    userId: "60681125-e117-4bb2-9287-eb840c4cf67e",
    firstName: "Bot",
    lastName: "User",
    emailId: this.botEmailId,
  };

  constructor(
    private router: Router, 
    private _chatdataservice: ChatDataService, 
    private _appicationdataservice: ApplicationDataService, 
    private localStorage: LocalStorageService,
  ) {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://172.23.238.230:5004/chat')
    .build();

    this.hubConnection.start().then(() => {}).catch(()=> {});
   }

  ngOnInit() {
    console.log(this.localStorage.retrieve("appId"));
    console.log(+this.localStorage.retrieve("appId"));
    this._chatdataservice.getChannels(this.workspaceName, this.userName).subscribe(data => {
      console.log("Data From Chat Team", data);
      console.log(data);
      this.channels = data;
    });
    this._appicationdataservice.getById(this.appId).subscribe(data => {
      console.log("Data From Marketplace Team", data);
      this.application = data;
    });
  }



  addBot() {
    
    this._chatdataservice.addBotToWorkspace(this.workspaceName, this.botUser).subscribe(
      data => {
        for (let selectedChannel of this.channelSelected) {
          this._chatdataservice.addBot(selectedChannel, this.botUserChannel).subscribe(data => {
            this.hubConnection.invoke('sendAllUserChannel', this.botEmailId)
              .catch(err => {});
          });
        }
      }
    );
    alert(`Bot Got Added To ${this.channelSelected.length} channel`);
    //this.router.navigate([this.application.appUrl]);
    //this.router.navigateByUrl(this.application.appUrl);
  }
}
