import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TeamFormComponent } from './team/team-forms/team-forms.component';
import { GameComponent } from './game/game.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TeamComponent } from './team/team.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { UpdateTeamComponent } from './team/update-team/update-team.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    TournamentsComponent,
    TeamFormComponent,
    GameComponent,
    TournamentComponent,
    TeamComponent,
    CreateTeamComponent,
    UpdateTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
