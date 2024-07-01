import { Component, OnInit } from '@angular/core';
import { Tournament, Match } from '../models/tournament.model';
import { Game } from '../models/game.model';  // Importa il modello per i giochi
import { Team } from '../models/team.model';
import { TeamService } from '../team/team.service';
import { TournamentService } from './tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentComponent implements OnInit {
  tournaments: Tournament[] = [];
  selectedTournament: Tournament | null = null;
  teams: Team[] = [];
  bracket: Match[] = [];
  newTeamId: string = '';
  games: Game[] = [];  // Aggiunto per gestire i giochi
  isCreateModalOpen: boolean = false;

  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.loadTournaments();
    this.loadGames();  // Carica i giochi all'avvio del componente
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(
      (data) => this.tournaments = data.content,
      (error) => console.error('Error fetching tournaments', error)
    );
  }

  selectTournament(tournamentId: string): void {
    this.tournamentService.getTournamentById(tournamentId).subscribe(
      (data) => {
        this.selectedTournament = data;
        this.loadTeamsForTournament(tournamentId);
        this.loadBracketForTournament(tournamentId);
      },
      (error) => console.error('Error fetching tournament details', error)
    );
  }

  loadTeamsForTournament(tournamentId: string): void {
    this.tournamentService.getTeamsForTournament(tournamentId).subscribe(
      (data) => this.teams = data,
      (error) => console.error('Error fetching teams for tournament', error)
    );
  }

  loadBracketForTournament(tournamentId: string): void {
    this.tournamentService.getBracketForTournament(tournamentId).subscribe(
      (data) => this.bracket = data,
      (error) => console.error('Error fetching bracket for tournament', error)
    );
  }

  generateBracket(tournamentId: string): void {
    this.tournamentService.generateBracket(tournamentId).subscribe(
      () => this.loadBracketForTournament(tournamentId),
      (error) => console.error('Error generating bracket', error)
    );
  }

  updateMatch(tournamentId: string, matchId: string, winnerId: string, loserId: string): void {
    this.tournamentService.updateMatch(tournamentId, matchId, { winnerId, loserId }).subscribe(
      () => this.loadBracketForTournament(tournamentId),
      (error) => console.error('Error updating match result', error)
    );
  }

  registerTeamToTournament(tournamentId: string): void {
    if (this.newTeamId) {
      this.teamService.registerTeamToTournament(tournamentId, this.newTeamId).subscribe(
        () => {
          this.newTeamId = '';
          this.loadTeamsForTournament(tournamentId);
        },
        (error) => console.error('Error registering team to tournament', error)
      );
    }
  }

  openCreateTournamentModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateTournamentModal(): void {
    this.isCreateModalOpen = false;
  }

  createTournament(formValues: any): void {
    const newTournament = {
      name: formValues.name,
      description: formValues.description,
      gameId: formValues.gameId,
      startDate: formValues.startDate,
      endDate: formValues.endDate
    };
    this.tournamentService.createTournament(newTournament).subscribe(
      () => {
        this.closeCreateTournamentModal();
        this.loadTournaments();
      },
      (error) => console.error('Error creating tournament', error)
    );
  }

  loadGames(): void {
    this.tournamentService.getAllGames().subscribe(
      (data) => this.games = data,
      (error) => console.error('Error fetching games', error)
    );
  }
}
