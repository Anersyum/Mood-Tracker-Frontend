import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthGuard } from './_guard/auth.guard';
import { LoggedinGuard } from './_guard/loggedin.guard';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      IndexComponent,
      ProfileComponent,
      StatisticsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AuthGuard,
      LoggedinGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
