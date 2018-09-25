import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  hubConnection: HubConnection;

  constructor() { 
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('localhost:80/connect/chat')
    .build();

    this.hubConnection.start().then(() => {}).catch(()=> {});
  }

  public addBotToParticularChannel(emailId: string) {
    return this.hubConnection.invoke('sendAllUserChannel', emailId)
    .catch(err => console.log("ERROR FROM HUB METHOD",err));
  }
}
