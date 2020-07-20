import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoggedinGuard } from './_guard/loggedin.guard';
import { AuthGuard } from './_guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DiaryComponent } from './diary/diary.component';
import { UserSearchComponent } from './user-search/user-search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedinGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoggedinGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: IndexComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuard] },
  { path: 'search', component: UserSearchComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
