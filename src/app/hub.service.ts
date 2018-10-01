import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  hubConnection: HubConnection;

  constructor() {
    console.log("Hub Connection Started");
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.chatHubUrl)
      .build();
      this.hubConnection.serverTimeoutInMilliseconds = 6000000;
    console.log("Hub Connection Ended");
  }

  public addBotToParticularChannel(emailId: string) {
    this.hubConnection.start().then(() => {
      console.log("connection started");
      this.hubConnection.invoke('sendAllUserChannel', emailId)
        .then(() => { console.log("HUB CONNECTION INVOKED") })
        .catch(err => console.log("ERROR FROM HUB METHOD", err));
    }).catch(() => { console.log("Error") });
  }
}
