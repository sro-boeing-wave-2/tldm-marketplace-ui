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

    this.hubConnection.start().then(() => {console.log("started")}).catch(()=> {});
  }

  public addBotToParticularChannel(emailId: string): Promise<any> {
    return this.hubConnection.invoke('sendAllUserChannel', emailId)
    .catch(err => console.log("ERROR FROM HUB METHOD",err));
  }
}
