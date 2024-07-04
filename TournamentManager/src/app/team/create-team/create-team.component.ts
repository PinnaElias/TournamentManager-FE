// create-team.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../team.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/models/game.model';
import { Team, CreateTeamRequestBody, UpdateTeamRequestBody } from 'src/app/models/team.model';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  createForm: FormGroup;
  currentUser: User | null = null;
  games: Game[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private authService: AuthService,
    private gameService: GameService,
    private router: Router
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatar: ['', [Validators.pattern('https?://.+')]],
      game: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Carica il currentUser
    this.authService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      },
      error => {
        console.error('Error getting current user:', error);
      }
    );

    // Carica i giochi
    this.gameService.getAllGames().subscribe(
      games => {
        this.games = games.content;
      },
      error => {
        console.error('Error fetching games:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      // Verifica che currentUser sia definito e che currentUser.id non sia undefined
      if (!this.currentUser?.id) {
        console.error('No current user available or currentUser.id is undefined');
        return;  // O visualizzare un messaggio di errore per l'utente
      }

      const selectedGameId = this.createForm.value.game;
      const selectedGame = this.games.find(game => game.id === selectedGameId);

      if (selectedGame) {
        const teamData: CreateTeamRequestBody = {
          name: this.createForm.value.name,
          avatar: this.createForm.value.avatar,
          game: selectedGame,
          nationality: this.createForm.value.nationality,
          members: []  // Rimuovi currentUser dalla richiesta
        };

        this.teamService.createTeam(teamData).subscribe(
          newTeam => {
            console.log('Team created successfully:', newTeam);

            // Aggiungi currentUser al team
            if (this.currentUser && this.currentUser.id) {
              this.teamService.addUserToTeam(newTeam.id, this.currentUser.id).subscribe(
                () => {
                  console.log('User added to team successfully');
                  this.router.navigate(['/teams', newTeam.id]);
                },
                error => {
                  console.error('Error adding user to team:', error);
                }
              );
            }
          },
          error => {
            console.error('Error creating team:', error);
          }
        );
      } else {
        console.error('Selected game is not valid');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
}