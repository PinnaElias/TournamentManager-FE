import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { TournamentService } from '../tournaments/tournament.service';
import { GameService } from '../game/game.service';
import { TeamService } from '../team/team.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tournaments: any[] = [];
  filteredTournaments: any[] = [];
  searchTerm: string = '';
  teamId: string = ''; // Assumi di avere il teamId
  tournamentId: string = '';

  constructor(private tournamentService: TournamentService,
    private gameService: GameService,
    private teamService: TeamService,
    private authService: AuthService
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

  getCurrentUserTeam(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.teamId = user.team.id; // Assicurati che la struttura dei dati corrisponda
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }

  registerTeam(tournamentId: string): void {
    if (!this.teamId) {
      console.error('No team found for current user');
      return;
    }
    this.teamService.registerTeamToTournament(tournamentId, this.teamId).subscribe(() => {
      console.log('Team registered successfully');
      // Puoi anche aggiungere logica aggiuntiva per aggiornare lo stato o notificare l'utente
    }, error => {
      console.error('Error registering team:', error);
    });
  }
}
