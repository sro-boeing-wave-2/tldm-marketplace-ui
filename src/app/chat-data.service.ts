import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Channel } from './channel';
import { map, catchError } from 'rxjs/operators';
import { User } from './user';


const API_URL = environment.chatApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatDataService {

  constructor(private http: Http) { }

  getChannels(workspaceName: string, userName: string): Observable<Channel[]> {
    return this.http
      .get(API_URL + `/chat/workspaces/${workspaceName}/${userName}`)
      .pipe(map(response => {
        const channels = response.json();
        return channels.map((channel) => new Channel(channel));
      }))
      .pipe(catchError(this.handleError));
  }

  addBotToWorkspace(workspaceName: string, botUser: User): Observable<User> {
    return this.http
      .put(API_URL + `/chat/workspaces/user/${workspaceName}`, botUser)
      .pipe(map(response => {
        return new User(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  addBot(channelId: string, botUser: User): Observable<User> {
    return this.http
      .put(API_URL + `/chat/workspaces/channel/${channelId}`, botUser)
      .pipe(map(response => {
        return new User(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}

