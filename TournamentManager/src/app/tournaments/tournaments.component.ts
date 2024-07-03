import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Tournament, CreateTournamentRequestBody, UpdateTournamentRequestBody, Page, MatchState } from 'src/app/models/tournament.model';
import { Game } from 'src/app/models/game.model';
import { GameService } from '../game/game.service';
import { TournamentService } from './tournament.service';
import { BracketType } from '../models/bracket.model';
import { Bracket, CreateBracketRequestBody, UpdateBracketRequestBody } from '../models/bracket.model';
import { Team } from '../models/team.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

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
  availableTeams: Team[] = []; // Squadre disponibili
  tournamentForm: FormGroup;
  bracketForm: FormGroup;

  @ViewChild('bracketModal') bracketModal!: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService
  ) {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      avatar: [''],
      description: [''],
      bracketType: ['', Validators.required],
      startingDate: [''],
      endingDate: [''],
      startingTime: [''],
      prize: [''],
      teams: [[]]  // Gestisce la selezione delle squadre come array di IDs
    });

    this.bracketForm = this.fb.group({
      bracketType: ['', Validators.required],
      participants: [[]],
      winner: [undefined as Team | undefined],  // `undefined` se non c'è vincitore
      losers: [[]]
    });
  }

  ngOnInit(): void {
    this.tournamentService.getAvailableTeams().subscribe(teams => {
      this.availableTeams = teams;
    });
  }

  onBracketTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBracketType = selectElement.value as BracketType;
    this.tournamentForm.patchValue({ bracketType: selectedBracketType });
    this.createBracketForType(selectedBracketType);
  }

  createBracketForType(type: BracketType): void {
    const bracket: CreateBracketRequestBody = {
      bracketType: type,
      participants: [],  // Inizia con una lista vuota di partecipanti
      tournament: undefined  // Associa il torneo successivamente
    };

    this.bracketForm.patchValue(bracket);

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
        backdrop.remove();
      }
    }
  }

  onBracketSubmit() {
    const bracketData: UpdateBracketRequestBody = {
      bracketType: this.bracketForm.get('bracketType')?.value as BracketType,
      participants: this.bracketForm.get('participants')?.value || [],
      winner: this.bracketForm.get('winner')?.value || undefined,  // `undefined` se non c'è vincitore
      losers: this.bracketForm.get('losers')?.value || []
    };

    console.log(bracketData);
    // Aggiungi il tuo codice per gestire l'invio del bracket al backend

    this.hideBracketModal();
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      const formData = new FormData();
      formData.append('name', this.tournamentForm.get('name')?.value || '');
      formData.append('avatar', this.tournamentForm.get('avatar')?.value || '');
      formData.append('description', this.tournamentForm.get('description')?.value || '');
      formData.append('bracketType', this.tournamentForm.get('bracketType')?.value || '');
      formData.append('startingDate', this.tournamentForm.get('startingDate')?.value || '');
      formData.append('endingDate', this.tournamentForm.get('endingDate')?.value || '');
      formData.append('startingTime', this.tournamentForm.get('startingTime')?.value || '');
      formData.append('prize', this.tournamentForm.get('prize')?.value || '');
      formData.append('teams', JSON.stringify(this.tournamentForm.get('teams')?.value || []));

      this.tournamentService.createTournament(formData).subscribe(response => {
        console.log(response);
        // Gestisci la risposta del backend
      });
    }
  }
}