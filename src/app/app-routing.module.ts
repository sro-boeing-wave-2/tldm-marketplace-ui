import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { AddAppComponent } from './add-app/add-app.component';
import { notEqual } from 'assert';
import { ApplicationsComponent } from './applications/applications.component';
import { SelectChannelComponent } from './select-channel/select-channel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/apps', pathMatch: 'full' },
  { path: 'apps', component: ApplicationsComponent },
  { path: 'add', component: AddAppComponent },
  { path: 'details/:id', component: AppDetailsComponent },
  { path: 'channels', component: SelectChannelComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
