import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tournament, CreateTournamentRequestBody, UpdateTournamentRequestBody } from 'src/app/models/tournament.model';
import { TournamentService } from './tournament.service';
import { BracketType } from '../models/bracket.model';
import { Team } from '../models/team.model';
import { CreateBracketRequestBody, UpdateBracketRequestBody } from '../models/bracket.model';
import { GameService } from '../game/game.service';
import { Game } from '../models/game.model';
import { BracketService } from '../bracket/bracket.service';
import { TeamService } from '../team/team.service';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentComponent implements OnInit {
  tournaments: Tournament[] = [];
  bracketTypes: BracketType[] = [
    BracketType.SINGLE_ELIMINATION,
    BracketType.DOUBLE_ELIMINATION,
    BracketType.ROUND_ROBIN,
    BracketType.LADDER_TOURNAMENT
  ];
  availableTeams: Team[] = [];  // Squadre disponibili
  availableGames: Game[] = [];
  tournamentForm: FormGroup;
  bracketForm: FormGroup;
  gameName: string = '';  // Aggiungi una variabile per memorizzare il nome del gioco
  selectedGame?: Game;  // Aggiungi una variabile per memorizzare il gioco selezionato
  bracketParticipants: Team[] = [];
  selectedTeams: Team[] = [];  // Squadre selezionate per il bracket
  selectedWinner?: Team;  // Vincitore del bracket

  @ViewChild('bracketModal') bracketModal!: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private gameService: GameService,
    private bracketService: BracketService,
    private teamService: TeamService
  ) {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      avatar: [''],
      description: [''],
      bracketType: ['', Validators.required],
      teams: [[]],
      startingDate: [''],
      endingDate: [''],
      startingTime: [''],
      prize: [''],
      game: ['', Validators.required]
    });

    this.bracketForm = this.fb.group({
      bracketType: ['', Validators.required],
      participants: [[]],  // Lista vuota di partecipanti
      winner: [undefined as Team | undefined],
      losers: [[]]
    });
  }

  ngOnInit(): void {
    this.loadGames();

    this.tournamentService.getAvailableTeams().subscribe({
      next: (teams) => {
        this.availableTeams = teams;
        console.log('Available teams:', this.availableTeams);
      },
      error: (error) => {
        console.error('Error fetching teams:', error);  // Log dell'errore
      }
    });

    this.loadTournaments();
  }

  loadTournaments(): void {
    this.tournamentService.getAllTournaments().subscribe({
      next: (page) => {
        this.tournaments = page.content;
        console.log('Tournaments loaded:', this.tournaments);
      },
      error: (error) => {
        console.error('Error fetching tournaments:', error);
      }
    });
  }

  onBracketTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBracketType = selectElement?.value as BracketType;
  
    if (selectedBracketType) {
      this.tournamentForm.patchValue({ bracketType: selectedBracketType });
      this.createBracketForType(selectedBracketType);
    }
  }
  

  createBracketForType(type: BracketType): void {
    this.bracketForm.patchValue({
      bracketType: type,
      participants: [],  // Lista vuota di partecipanti
      winner: undefined,  // Nessun vincitore inizialmente
      losers: []  // Lista vuota di perdenti
    });
    this.selectedTeams = [];  // Pulisci la lista delle squadre selezionate

    if (this.bracketModal?.nativeElement) {
      const modalElement = this.bracketModal.nativeElement;
      modalElement.classList.add('show');
      modalElement.setAttribute('aria-hidden', 'false');
      modalElement.style.display = 'block';

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          this.hideBracketModal();
        });
      }
    }
  }
  
  hideBracketModal(): void {
    if (this.bracketModal?.nativeElement) {
      const modalElement = this.bracketModal.nativeElement;
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.removeEventListener('click', () => {
          this.hideBracketModal();
        });
        backdrop.remove();
      }
    }
  }

  onBracketSubmit() {
    if (this.bracketForm.valid) {
      const bracketData: CreateBracketRequestBody = {
        bracketType: this.bracketForm.get('bracketType')?.value as BracketType,
        participants: this.bracketForm.get('participants')?.value || [],  // Usa i partecipanti selezionati
        tournament: undefined,  // Associa il torneo successivamente
      };

      this.bracketService.createBracket(bracketData).subscribe({
        next: (response) => {
          console.log('Bracket created:', response);
          this.hideBracketModal();
        },
        error: (error) => {
          console.error('Error creating bracket:', error);
        }
      });
    } else {
      console.error('Bracket Form is invalid:', this.bracketForm.errors);
    }
  }

  onAddTeamToBracket(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTeamIds = Array.from(selectElement.selectedOptions).map(option => (option as HTMLOptionElement).value);

    selectedTeamIds.forEach(id => {
      const team = this.availableTeams.find(t => t.id === id);
      if (team && !this.bracketParticipants.find(t => t.id === team.id)) {
        this.bracketParticipants.push(team);
      }
    });

    this.bracketForm.patchValue({ participants: this.bracketParticipants });
    // Clear the selected options in the dropdown after adding the teams
    selectElement.selectedIndex = -1;  // Reset selection
  }
  
  onRemoveTeamFromBracket(team: Team): void {
    this.bracketParticipants = this.bracketParticipants.filter(t => t.id !== team.id);
    this.bracketForm.patchValue({ participants: this.bracketParticipants });
  }

  onSelectLoser(team: Team) {
    const losers: Team[] = this.bracketForm.get('losers')?.value || [];

    if (!losers.find(t => t.id === team.id)) {
      losers.push(team);
      this.bracketForm.patchValue({ losers });
    }
  }

  onSubmit(): void {
    if (this.tournamentForm.valid) {
      const tournamentData: CreateTournamentRequestBody = this.tournamentForm.value;

      this.tournamentService.createTournament(tournamentData).subscribe({
        next: (response) => {
          console.log('Tournament created:', response);
          this.loadTournaments();
        },
        error: (error) => {
          console.error('Error creating tournament:', error);
        }
      });
    }
  }

  getGameByName(name: string): void {
    this.gameService.getGameByName(name).subscribe({
      next: (game) => {
        this.selectedGame = game;
        console.log('Game fetched by name:', this.selectedGame);
        // Aggiungi il codice per gestire il gioco ottenuto, ad esempio:
        this.tournamentForm.patchValue({ game: this.selectedGame?.name });  // Usa il nome del gioco
      },
      error: (error) => {
        console.error('Error fetching game by name:', error);
      }
    });
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe({
      next: (page) => {
        this.availableGames = page.content;
        console.log('Available games:', this.availableGames);
      },
      error: (error) => {
        console.error('Error fetching games:', error);
      }
    });
  }

  loadTeamsByGame(gameName: string): void {
    this.teamService.getTeamsByGame(gameName).subscribe({
      next: (teams) => {
        this.availableTeams = teams;
        console.log('Teams for selected game:', this.availableTeams);
      },
      error: (error) => {
        console.error('Error fetching teams by game:', error);
      }
    });
  }

  onGameChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedGameName = selectElement?.value;
    this.getGameByName(selectedGameName);
    this.loadTeamsByGame(selectedGameName);  // Fetch teams based on the selected game
  }
}
