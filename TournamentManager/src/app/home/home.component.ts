import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { TournamentService } from '../tournaments/tournament.service';
import { GameService } from '../game/game.service';
import { TeamService } from '../team/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tournaments: any[] = [];
  filteredTournaments: any[] = [];
  searchTerm: string = '';

  constructor(private tournamentService: TournamentService,
    private gameService:GameService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.gameService.getAllGames();
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe(response => {
      console.log(response);
      this.tournaments = response.content;
      this.filteredTournaments = this.tournaments;
    });
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.filteredTournaments = this.searchTerm 
      ? this.tournaments.filter(tournament => 
          tournament.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.tournaments;
  }
}
