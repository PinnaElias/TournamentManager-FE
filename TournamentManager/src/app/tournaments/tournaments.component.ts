import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tournament, CreateTournamentRequestBody, UpdateTournamentRequestBody, Page } from 'src/app/models/tournament.model';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game/game.service';
import { TournamentService } from './tournament.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentComponent implements OnInit {
  tournaments: Tournament[] = [];
  games: Game[] = [];
  editTournament: Tournament | null = null;
  isCreateModalOpen = false;
  isEditModalOpen = false;

  constructor(
    private tournamentService: TournamentService,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTournaments();
    this.loadGames();
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(
      (data) => this.tournaments = data.content,  // Assicurati che questo sia corretto
      (error) => console.error('Error fetching tournaments', error)
    );
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe(
      (data) => this.games = data.content,  // Assicurati che questo sia corretto
      (error) => console.error('Error fetching games', error)
    );
  }

  openCreateTournamentModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateTournamentModal(): void {
    this.isCreateModalOpen = false;
  }

  openEditTournamentModal(tournamentId: string): void {
    this.tournamentService.getTournamentById(tournamentId).subscribe(
      (data) => {
        this.editTournament = data;
        this.isEditModalOpen = true;
      },
      (error) => console.error('Error fetching tournament details', error)
    );
  }

  closeEditTournamentModal(): void {
    this.isEditModalOpen = false;
    this.editTournament = null;  // Reset to null to avoid issues
  }

  createTournament(formValues: any): void {
    const newTournament: CreateTournamentRequestBody = {
      name: formValues.name,
      description: formValues.description,
      game: formValues.game, // Modificato per usare 'game' invece di 'gameId'
      startingDate: formValues.startingDate,
      endingDate: formValues.endingDate
    };
    this.tournamentService.createTournament(newTournament).subscribe(
      () => {
        this.closeCreateTournamentModal();
        this.loadTournaments();
      },
      (error) => console.error('Error creating tournament', error)
    );
  }

  updateTournament(): void {
    if (this.editTournament) {
      const updatedTournament: UpdateTournamentRequestBody = {
        name: this.editTournament.name,
        description: this.editTournament.description,
        game: this.editTournament.game,  // Modificato per usare 'game' invece di 'gameId'
        endingDate: this.editTournament.endingDate
      };
      if (this.editTournament.id) {
        this.tournamentService.updateTournament(this.editTournament.id, updatedTournament).subscribe(
          () => {
            this.closeEditTournamentModal();
            this.loadTournaments();
          },
          (error) => console.error('Error updating tournament', error)
        );
      }
    }
  }

  deleteTournament(tournamentId: string): void {
    this.tournamentService.deleteTournament(tournamentId).subscribe(
      () => this.loadTournaments(),
      (error) => console.error('Error deleting tournament', error)
    );
  }

  viewBracket(tournamentId: string): void {
    this.router.navigate([`/tournaments/${tournamentId}/bracket`]);
  }
}