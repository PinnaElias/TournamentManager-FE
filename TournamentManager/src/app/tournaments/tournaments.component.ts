import { Component, OnInit } from '@angular/core';
import { TournamentService } from './tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: any[] = [];
  searchQuery: string = '';

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(data => {
      this.tournaments = data.content;
    });
  }

  onSearch(): void {
    // Aggiungere logica per filtrare i tornei in base a searchQuery
  }

  createTournament(): void {
    // Aggiungere logica per navigare al form di creazione del torneo
  }
}
