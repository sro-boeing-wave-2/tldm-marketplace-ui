import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ApplicationDataService } from './application-data.service';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AddAppComponent } from './add-app/add-app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationsComponent } from './applications/applications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SelectChannelComponent } from './select-channel/select-channel.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { AuthInterceptor } from './http.interceptor';
import { LoginService } from './login.service';
import { InstallBotComponent } from './install-bot/install-bot.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    AppDetailsComponent,
    AddAppComponent,
    ApplicationsComponent,
    SelectChannelComponent,
    LoginComponent,
    WorkspaceListComponent,
    InstallBotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  FlexLayoutModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2Webstorage
  ],
  providers: [ApplicationDataService, 
    LoginService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
