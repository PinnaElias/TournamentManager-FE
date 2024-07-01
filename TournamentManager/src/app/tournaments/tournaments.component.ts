import { Component, OnInit } from '@angular/core';
import { TournamentService } from './tournament.service';
import { CreateTournamentRequestBody, Tournament } from '../models/tournament.model';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(
      page => {
        this.tournaments = page.content;
        console.log('Tournaments:', this.tournaments);  // Debugging
      },
      error => {
        console.error('Error loading tournaments:', error);
      }
    );
  }

  createTournament(createTournamentRequestBody: CreateTournamentRequestBody): void {
    this.tournamentService.createTournament(createTournamentRequestBody).subscribe(
      newTournament => {
        console.log('Tournament created successfully:', newTournament);
        this.loadTournaments();
      },
      error => {
        console.error('Error creating tournament:', error);
      }
    );
  }
}
