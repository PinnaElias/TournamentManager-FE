// update-team.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../team.service';
import { Team } from 'src/app/models/team.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {

  updateForm: FormGroup;
  team!: Team;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatar: [''],
      game: ['', Validators.required],
      nationality: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
  
    // Verifica se teamId è null prima di chiamare getTeamById
    if (teamId) {
      this.teamService.getTeamById(teamId).subscribe(
        team => {
          this.team = team;
          this.updateForm.patchValue({
            name: team.name,
            avatar: team.avatar,
            game: team.game,
            nationality: team.nationality
          });
        },
        error => {
          console.error('Error loading team:', error);
        }
      );
    } else {
      console.error('Team ID parameter is null or undefined.');
      // Gestione dell'errore o reindirizzamento a una pagina di errore, se necessario
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const teamId = this.route.snapshot.paramMap.get('id');
      
      if (!teamId) {
        console.error('Team ID parameter is null or undefined.');
        // Gestione dell'errore, ad esempio reindirizzamento a una pagina di errore
        return;
      }
  
      const updatedTeamData = {
        name: this.updateForm.value.name,
        avatar: this.updateForm.value.avatar,
        game: this.updateForm.value.game,
        nationality: this.updateForm.value.nationality
      };
  
      this.teamService.updateTeam(teamId, updatedTeamData).subscribe(
        updatedTeam => {
          console.log('Team updated successfully:', updatedTeam);
          // Esegui altre azioni come il reindirizzamento alla pagina del team aggiornato
          this.router.navigate(['/teams', updatedTeam.id]);
        },
        error => {
          console.error('Error updating team:', error);
          // Gestione dell'errore durante l'aggiornamento del team
          // Puoi mostrare un messaggio all'utente o eseguire altre azioni necessarie
        }
      );
    } else {
      console.error('Form is invalid.');
      // Gestione dell'errore per il form non valido
      // Puoi mostrare un messaggio all'utente o eseguire altre azioni necessarie
    }
  }

}
