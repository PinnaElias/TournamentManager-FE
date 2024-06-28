import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';
import { CreateTeamRequestBody } from '../models/team.model';
import { UpdateTeamRequestBody } from '../models/team.model';
import { DeleteTeamResponseBody } from '../models/team.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  currentUser: any; // Dichiarazione di currentUser, è importante definire il tipo corretto

  constructor(
    private teamService: TeamService,
    private authService: AuthService // Inietta AuthService nel costruttore
  ) { }

  ngOnInit(): void {
    this.loadTeams();
    this.loadCurrentUser(); // Carica l'utente corrente all'inizio
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(
      page => {
        this.teams = page.content;
      },
      error => {
        console.error('Error loading teams:', error);
      }
    );
  }

  loadCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      },
      error => {
        console.error('Error getting current user:', error);
      }
    );
  }

  createTeam(createTeamRequestBody: CreateTeamRequestBody): void {
    this.teamService.createTeam(createTeamRequestBody).subscribe(
      newTeam => {
        console.log('Team created successfully:', newTeam);
        this.loadTeams();
      },
      error => {
        console.error('Error creating team:', error);
      }
    );
  }

  updateTeam(teamId: string, updateTeamRequestBody: UpdateTeamRequestBody): void {
    this.teamService.updateTeam(teamId, updateTeamRequestBody).subscribe(
      updatedTeam => {
        console.log('Team updated successfully:', updatedTeam);
        this.loadTeams();
      },
      error => {
        console.error('Error updating team:', error);
      }
    );
  }

  deleteTeam(teamId: string): void {
    this.teamService.deleteTeam(teamId).subscribe(
      response => {
        console.log('Team deleted successfully:', response);
        this.loadTeams();
      },
      error => {
        console.error('Error deleting team:', error);
      }
    );
  }
}
