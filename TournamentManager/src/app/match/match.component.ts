// src/app/components/match/match.component.ts

import { Component, OnInit } from '@angular/core';
import { MatchService } from './match.service';
import { Match, CreateMatchRequestBody, UpdateMatchRequestBody, MatchState } from '../models/match.model';
import { TeamService } from '../team/team.service';
import { TournamentService } from '../tournaments/tournament.service';
import { BracketService } from '../bracket/bracket.service';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import { Bracket } from '../models/bracket.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matches: Match[] = [];
  teams: Team[] = [];
  tournaments: Tournament[] = [];
  brackets: Bracket[] = [];
  selectedMatch: Match | null = null;
  newMatch: CreateMatchRequestBody = {
    startingDate: '',
    startingTime: '',
    teamASide: {} as Team,
    teamBSide: {} as Team,
    matchState: MatchState.PLANNED,
    tournament: {} as Tournament,
    bracket: {} as Bracket,
  };
  isCreateModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  editMatch: UpdateMatchRequestBody = {};

  matchStates = Object.values(MatchState);

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private tournamentService: TournamentService,
    private bracketService: BracketService
  ) {}

  ngOnInit(): void {
    this.loadMatches();
    this.loadTeams();
    this.loadTournaments();
    this.loadBrackets();
  }

  loadMatches(): void {
    this.matchService.getAllMatches().subscribe(
      (data) => this.matches = data.content,
      (error) => console.error('Error fetching matches', error)
    );
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(
      (data) => this.teams = data.content,
      (error) => console.error('Error fetching teams', error)
    );
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(
      (data) => this.tournaments = data.content,
      (error) => console.error('Error fetching tournaments', error)
    );
  }

  loadBrackets(): void {
    this.bracketService.getAllBrackets().subscribe(
      (data) => this.brackets = data.content,
      (error) => console.error('Error fetching brackets', error)
    );
  }

  createMatch(): void {
    this.matchService.createMatch(this.newMatch).subscribe(
      () => {
        this.isCreateModalOpen = false;
        this.loadMatches();
      },
      (error) => console.error('Error creating match', error)
    );
  }

  openCreateMatchModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateMatchModal(): void {
    this.isCreateModalOpen = false;
  }

  openEditMatchModal(match: Match): void {
    this.selectedMatch = match;
    this.editMatch = {
      startingDate: match.startingDate,
      startingTime: match.startingTime,
      teamASide: match.teamASide,
      teamBSide: match.teamBSide,
      matchState: match.matchState,
      tournament: match.tournament,
      bracket: match.bracket,
      winner: match.winner,
      loser: match.loser,
      teamAScore: match.teamAScore,
      teamBScore: match.teamBScore
    };
    this.isEditModalOpen = true;
  }

  closeEditMatchModal(): void {
    this.isEditModalOpen = false;
    this.selectedMatch = null;
  }

  updateMatch(): void {
    if (this.selectedMatch) {
      this.matchService.updateMatch(this.selectedMatch.id, this.editMatch).subscribe(
        () => {
          this.isEditModalOpen = false;
          this.loadMatches();
        },
        (error) => console.error('Error updating match', error)
      );
    }
  }

  deleteMatch(id: number): void {
    this.matchService.deleteMatch(id).subscribe(
      () => this.loadMatches(),
      (error) => console.error('Error deleting match', error)
    );
  }
}
