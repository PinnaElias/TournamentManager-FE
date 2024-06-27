// teams.component.ts

import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamsComponent implements OnInit {

  teams!: Team[];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => {
        console.error('Error loading teams:', error);
      }
    );
  }

  // Aggiungi altri metodi per gestire altre funzioni del componente come createTeam(), deleteTeam(), ecc.
}
