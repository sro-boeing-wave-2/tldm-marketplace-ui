import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Channel } from './channel';
import { map, catchError } from 'rxjs/operators';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


const API_URL = environment.chatApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatDataService {

  constructor(private httpclient: HttpClient) { }

  // getChannels(workspaceName: string, userName: string): Observable<Channel[]> {
  //   return this.http
  //     .get(API_URL + `/chat/workspaces/${workspaceName}/${userName}`)
  //     .pipe(map(response => {
  //       const channels = response.json();
  //       return channels.map((channel) => new Channel(channel));
  //     }))
  //     .pipe(catchError(this.handleError));
  // }

  getChannels(workspaceName: string, userName: string): Observable<Channel[]> {
    return this.httpclient
      .get<Channel []>(API_URL + `/chat/workspaces/${workspaceName}/${userName}`).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  // addBotToWorkspace(workspaceName: string, botUser: User): Observable<User> {
  //   return this.http
  //     .put(API_URL + `/chat/workspaces/user/${workspaceName}`, botUser)
  //     .pipe(map(response => {
  //       return new User(response.json());
  //     }))
  //     .pipe(catchError(this.handleError));
  // }

  addBotToWorkspace(workspaceName: string, botUser: User): Observable<User> {
    console.log("Bot User");
    console.log(botUser);
    return this.httpclient
      .put<User>(API_URL + `/chat/workspaces/user/${workspaceName}`, botUser)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }
  // addBot(channelId: string, botUser: User): Observable<User> {
  //   return this.http
  //     .put(API_URL + `/chat/workspaces/channel/${channelId}`, botUser)
  //     .pipe(map(response => {
  //       return new User(response.json());
  //     }))
  //     .pipe(catchError(this.handleError));
  // }

  addBot(channelId: string, botUser: User): Observable<User> {
    console.log("addng bot to channel");
    console.log(botUser);
    return this.httpclient
      .put<User>(API_URL + `/chat/workspaces/channel/${channelId}`, botUser)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }

  // private handleError(error: Response | any) {
  //   console.log('ApiService::handleError', error);
  //   return throwError(error);
  // }
}

