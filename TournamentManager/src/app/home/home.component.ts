import { Component, OnInit } from '@angular/core';
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
  teamId: string | null = null;
  tournamentId: string = '';

  constructor(private tournamentService: TournamentService,
    private gameService: GameService,
    private teamService: TeamService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.gameService.getAllGames();
    this.getTournaments();
    this.getCurrentUserTeam();
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
      this.teamId = user.team.id;
      console.log(this.teamId)
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }

  registerTeam(tournamentId: string): void {
    if (!this.teamId) {
      const errorMessage = 'No team found for current user';
      console.error(errorMessage);
      alert(errorMessage); // Mostra l'errore
      return;
    }
    this.tournamentService.addTeamToTournament(tournamentId, this.teamId).subscribe(() => {
      const successMessage = 'Team registered successfully';
      console.log(successMessage);
      alert(successMessage); // Operazione andata a buon fine
    }, error => {
      const errorMessage = 'Error registering team: ' + (error?.message || 'Unknown error');
      console.error(errorMessage, error);
      alert(errorMessage); 
    });
  }
}