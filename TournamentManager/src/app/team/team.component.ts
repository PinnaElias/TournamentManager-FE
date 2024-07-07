import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';
import { CreateTeamRequestBody, UpdateTeamRequestBody } from '../models/team.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamsComponent implements OnInit {
  isExpanded = false;
  teams: Team[] = [];
  currentUser: User | null = null;

  constructor(
    private teamService: TeamService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadTeams();
    this.loadCurrentUser();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(
      page => {
        this.teams = page.content;
        console.log('Teams:', this.teams);  // Debugging
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
        console.log('Current User:', this.currentUser);  // Debugging
        console.log('Current User Team ID:', this.currentUser?.team?.id);  // Debugging
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

  addUserToTeam(teamId: string): void {
    // assumo currentUser non sia null per il momento
    if (this.currentUser?.id) {
      this.teamService.addUserToTeam(teamId, this.currentUser.id).subscribe(
        updatedTeam => {
          console.log('User added to team successfully:', updatedTeam);
          alert("You are now a part of this team!");
          this.loadTeams();
          this.loadCurrentUser(); // Ricarica l'utente per aggiornare le informazioni del team
        },
        error => {
          // Log generico degli errori
          console.error('An error occurred while adding user to team:', error);
          alert('An error occurred.')
        }
      );
    } else {
      // Log se l'utente corrente è nullo
      console.error('Current user is null. Cannot add user to team.');
      alert('You must first Log In!')
    }
  }
}
