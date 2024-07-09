import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tournament, CreateTournamentRequestBody } from 'src/app/models/tournament.model';
import { TournamentService } from './tournament.service';
import { BracketType } from '../models/bracket.model';
import { Team } from '../models/team.model';
import { CreateBracketRequestBody } from '../models/bracket.model';
import { GameService } from '../game/game.service';
import { Game } from '../models/game.model';
import { BracketService } from '../bracket/bracket.service';
import { TeamService } from '../team/team.service';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs';

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
  gameName: string = '';  // memorizza il nome del gioco
  selectedGame?: Game;  // memorizza il gioco selezionato
  bracketParticipants: Team[] = [];
  selectedTeams: Team[] = [];  // Squadre selezionate per il bracket
  selectedWinner?: Team; //Utile per le implementazioni della prossima versione

  @ViewChild('bracketModal') bracketModal!: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private gameService: GameService,
    private bracketService: BracketService,
    private teamService: TeamService,
    private authservice: AuthService
  ) {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      avatar: [''],
      description: [''],
      participants: [[]],
      startingDate: [''],
      endingDate: [''],
      startingTime: [''],
      prize: [''],
      game: ['', Validators.required]
    });

    this.bracketForm = this.fb.group({
      bracket: [''],
      participants: [[]],
      winner: [undefined as Team | undefined],
      losers: [[]]
    });
    bracket: ['']
  }

  ngOnInit(): void {
    this.loadGames();

    this.tournamentService.getAvailableTeams().subscribe({
      next: (teams) => {
        this.availableTeams = teams;
        console.log('Available teams:', this.availableTeams);
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
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
      participants: [],
      winner: undefined,  // nessun vincitore inizialmente
      losers: []  // lista vuota per gli sconfitti
    });
    this.selectedTeams = [];  // pulizia della lista delle squadre selezionate

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
        participants: this.bracketForm.get('participants')?.value || [],  // usa i partecipanti selezionati
        tournament: undefined,  // associa il torneo successivamente
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
    const selectedTeamIds = Array.from(selectElement.selectedOptions)
      .map(option => (option as HTMLOptionElement).value);

    selectedTeamIds.forEach(id => {
      const team = this.availableTeams.find(t => t.id === id);
      if (team && !this.bracketParticipants.find(t => t.id === team.id)) {
        this.bracketParticipants.push(team);
      }
    });

    this.bracketForm.patchValue({ participants: this.bracketParticipants });
    selectElement.selectedIndex = -1;
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
    this.authservice.getCurrentUser().pipe(switchMap((user) => {
      if (this.tournamentForm.valid) {
        const tournamentData: CreateTournamentRequestBody = this.tournamentForm.value;
        console.log(tournamentData);
        return this.tournamentService.createTournament({ ...tournamentData, game: this.selectedGame });
      } else throw new Error("form non valido");
    })).subscribe({
      next: (response) => {
        console.log('Tournament created:', response);
        alert('Tournament created!');
        this.loadTournaments();
      },
      error: (error) => {
        console.error('Error creating tournament:', error);
      }
    })
  }

  getGameByName(name: string): void {
    this.gameService.getGameByName(name).subscribe({
      next: (game) => {
        this.selectedGame = game;
        console.log('Game fetched by name:', this.selectedGame);
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
    const selectedGame = this.availableGames.find(game => game.name === selectedGameName);

    if (selectedGame) {
      this.getGameByName(selectedGameName);
      this.loadTeamsByGame(selectedGame.id!);  // Passa l'ID del gioco selezionato
    } else {
      console.error('Selected game not found in available games');
    }
  }
}
