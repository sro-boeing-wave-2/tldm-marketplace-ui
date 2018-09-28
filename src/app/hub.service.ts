import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  hubConnection: HubConnection;

  constructor() { 
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(environment.chatHubUrl)
    .build();
  }

  public addBotToParticularChannel(emailId: string) {
    this.hubConnection.start().then(() => {
      console.log("started");
      this.hubConnection.invoke('sendAllUserChannel', emailId)
        .catch(err => console.log("ERROR FROM HUB METHOD",err));
    }).catch(()=> {});
  }
}
