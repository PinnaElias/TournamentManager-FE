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
import { AuthInterceptor } from './auth/auth.interceptor';
import { GameComponent } from './game/game.component';
import { UpdateTeamComponent } from './team/update-team/update-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsComponent } from './team/team.component';
import { TournamentComponent } from './tournaments/tournaments.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { BracketComponent } from './bracket/bracket.component';
import { MatchComponent } from './match/match.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    TournamentComponent,
    GameComponent,
    CreateTeamComponent,
    UpdateTeamComponent,
    TeamsComponent,
    BracketComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
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
