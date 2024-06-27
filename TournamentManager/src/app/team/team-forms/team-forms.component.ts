import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../team.service';
import { Game } from 'src/app/models/game.model';
import { CreateTeamRequestBody, UpdateTeamRequestBody } from 'src/app/models/team.model';
import { GameService } from 'src/app/game/game.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-forms.component.html',
  styleUrls: ['./team-forms.component.scss']
})
export class TeamFormComponent implements OnInit {
  teamForm!: FormGroup;
  games: Game[] = []; 

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private gameService: GameService  
  ) { }

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      avatar: ['', Validators.pattern('https?://.+')],
      game: ['', Validators.required],
      members: [[]],
      nationality: ['', Validators.required]
    });

    // Carica i giochi disponibili al caricamento del componente
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe(
      (data) => {
        this.games = data.content;  // Salva l'elenco dei giochi nell'array games
      },
      (error) => {
        console.error('Error loading games:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      const formValue = this.teamForm.value;
      const createTeamRequest: CreateTeamRequestBody = {
        name: formValue.name,
        avatar: formValue.avatar,
        game: formValue.game,
        members: formValue.members,
        nationality: formValue.nationality
      };

      this.teamService.createTeam(createTeamRequest).subscribe(response => {
        // Gestisci la risposta
      });
    }
  }
}
