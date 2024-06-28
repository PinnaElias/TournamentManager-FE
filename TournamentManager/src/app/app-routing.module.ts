import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { GameComponent } from './game/game.component';
import { TeamsComponent } from './team/team.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { UpdateTeamComponent } from './team/update-team/update-team.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'games', component: GameComponent },
  { path: 'team', component: TeamsComponent },
  { path: 'team-create', component: CreateTeamComponent },
  { path: 'team-update', component: UpdateTeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
