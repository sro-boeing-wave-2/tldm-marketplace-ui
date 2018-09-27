import { Component, OnInit } from '@angular/core';
import { ChatDataService } from '../chat-data.service';
import { Channel } from '../channel';
import { User } from '../user';
import { ApplicationDataService } from '../application-data.service';
import { UserChannel } from '../user-channel';
import { LocalStorageService } from 'ngx-webstorage';
import { HubService } from '../hub.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-channel',
  templateUrl: './select-channel.component.html',
  styleUrls: ['./select-channel.component.css']
})
export class SelectChannelComponent implements OnInit {
  hubUrl: string = environment.chatHubUrl;
  workspaceName: string = this.localStorage.retrieve("workspace");//"TLDM";
  userName: string = this.localStorage.retrieve("email"); //"rishabh120296@gmail.com";
  botEmailId: string = this.localStorage.retrieve("bot-email-id");
  channels: Channel[];
  channelSelected;
  appId=this.localStorage.retrieve("appId");
  application;
  botUser: User = {
    id: "60681125-e117-4bb2-9287-eb840c4cf67e",
    firstName: this.localStorage.retrieve("name"),
    lastName: "Bot",
    emailId: this.botEmailId
  };

  botUserChannel: UserChannel = {
    id: "101010101010101010101010",
    userId: "60681125-e117-4bb2-9287-eb840c4cf67e",
    firstName: this.localStorage.retrieve("name"),
    lastName: "Bot",
    emailId: this.botEmailId,
  };
  hubConnection: HubConnection;
  private selectedChannelsDetail: Channel []=[];

  constructor(
    private _chatdataservice: ChatDataService, 
    private _appicationdataservice: ApplicationDataService, 
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl)
    .build();

    this.hubConnection.start().then(() => {console.log("started")}).catch(()=> {});
   }

  ngOnInit() {
    this._chatdataservice.getChannels(this.workspaceName, this.userName).subscribe(data => {
      this.channels = data;
    });
    this._appicationdataservice.getById(this.appId).subscribe(data => {
      this.application = data;
    });
  }



  addBot() {
    for (let selectedChannel of this.channelSelected) {
      let channel = this.channels.find(x => x.channelId == selectedChannel)
      this.selectedChannelsDetail.push(channel);
    }
    this._appicationdataservice.setSelectedChannelDetails(this.selectedChannelsDetail);
    this._chatdataservice.addBotToWorkspace(this.workspaceName, this.botUser).subscribe(
      data => {
        for (let selectedChannel of this.channelSelected) {
          this._chatdataservice.addBot(selectedChannel, this.botUserChannel).subscribe(data => {
            this.hubConnection.invoke('sendAllUserChannel', this.botEmailId)
              .catch(err => {}).then(() => {
              });
            // this.hubservice.addBotToParticularChannel(this.botEmailId).then(data => console.log("success"), err => console.log("error"));
          },err => console.log("Bot Already Added To ", selectedChannel));
        }
      }, err => {
        for (let selectedChannel of this.channelSelected) {
          this._chatdataservice.addBot(selectedChannel, this.botUserChannel).subscribe(data => {
            this.hubConnection.invoke('sendAllUserChannel', this.botEmailId)
              .catch(err => console.log("ERROR FROM HUB METHOD",err)).then(() => {
              });
            // this.hubservice.addBotToParticularChannel(this.botEmailId).then(data => console.log("success"), err => console.log("error"));
          },err => console.log("Bot Already Added To ", selectedChannel));
        }
      }
    );
    this.router.navigate(["added-bot"]);
  }
}
