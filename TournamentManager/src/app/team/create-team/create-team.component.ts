// create-team.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from '../team.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  createForm: FormGroup;
  currentUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatar: [''],
      game: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      },
      error => {
        console.error('Error getting current user:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const teamData = {
        name: this.createForm.value.name,
        avatar: this.createForm.value.avatar,
        game: this.createForm.value.game,
        nationality: this.createForm.value.nationality,
        members: [this.currentUser] // Aggiungi l'utente loggato come membro del team
      };

      this.teamService.createTeam(teamData).subscribe(
        newTeam => {
          console.log('Team created successfully:', newTeam);
          // Esegui altre azioni come il reindirizzamento alla pagina del team creato
          this.router.navigate(['/teams', newTeam.id]);
        },
        error => {
          console.error('Error creating team:', error);
        }
      );
    } else {
      // Form non valido, gestisci eventuali errori
    }
  }

}
