import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from './match.service';
import { TournamentService } from '../tournaments/tournament.service';
import { TeamService } from '../team/team.service';
import { BracketService } from '../bracket/bracket.service';
import { Match, UpdateMatchRequestBody, CreateMatchRequestBody, MatchState } from '../models/match.model';
import { Tournament, Page } from '../models/tournament.model';
import { Team } from '../models/team.model';
import { Bracket } from '../models/bracket.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  match: Match | null = null;
  matches: Match[] = [];
  teams: any[] = [];
  matchStates: string[] = Object.values(MatchState);
  tournaments: Tournament[] = [];
  brackets: any[] = [];
  isCreateModalOpen = false;
  isEditModalOpen = false;
  newMatch: CreateMatchRequestBody = {
    startingDate: '',
    startingTime: '',
    teamASide: 0,
    teamBSide: 0,
    matchState: MatchState.PENDING,
    tournamentId: 0,
    bracketId: 0
  };
  editMatch: UpdateMatchRequestBody = {};

  constructor(
    private matchService: MatchService,
    private tournamentService: TournamentService,
    private BracketService: BracketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMatches();
    this.loadTeams();
    this.loadTournaments();
    this.loadBrackets();
  }

  loadMatches(): void {
    this.matchService.getAllMatches().subscribe(matches => this.matches = matches.content);
  }

  loadTeams(): void {
    // Assuming there is a team service to fetch teams
    // this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(page => this.tournaments = page.content);
  }

  loadBrackets(): void {
    // Assuming there is a bracket service to fetch brackets
  }

  openCreateMatchModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateMatchModal(): void {
    this.isCreateModalOpen = false;
  }

  openEditMatchModal(match: Match): void {
    this.editMatch = {
      startingDate: match.startingDate,
      startingTime: match.startingTime,
      teamASide: Number(match.teamASide.id), // Converti in numero
      teamBSide: Number(match.teamBSide.id), // Converti in numero
      teamAScore: match.teamAScore,
      teamBScore: match.teamBScore,
      matchState: match.matchState,
      tournamentId: Number(match.tournament.id), // Converti in numero
      bracketId: Number(match.bracket.id), // Converti in numero
      winnerId: match.winner ? Number(match.winner.id) : undefined, // Converti in numero se definito
      loserId: match.loser ? Number(match.loser.id) : undefined // Converti in numero se definito
    };
    this.isEditModalOpen = true;
  }

  closeEditMatchModal(): void {
    this.isEditModalOpen = false;
  }

  createMatch(): void {
    this.matchService.createMatch(this.newMatch).subscribe(
      match => {
        this.matches.push(match);
        this.closeCreateMatchModal();
      }
    );
  }

  updateMatch(): void {
    if (this.match) {
      this.matchService.updateMatch(this.match.id, this.editMatch).subscribe(
        updatedMatch => {
          const index = this.matches.findIndex(m => m.id === updatedMatch.id);
          if (index !== -1) {
            this.matches[index] = updatedMatch;
          }
          this.closeEditMatchModal();
        }
      );
    }
  }

  deleteMatch(id: number): void {
    this.matchService.deleteMatch(id).subscribe(
      () => this.matches = this.matches.filter(match => match.id !== id)
    );
  }
}
