import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TeamFormComponent } from './team/team-forms/team-forms.component';
import { GameComponent } from './game/game.component';
import { TeamsComponent } from './team/team.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'games', component: GameComponent },
  { path: 'team', component: TeamsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
