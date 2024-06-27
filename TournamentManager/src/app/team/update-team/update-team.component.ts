// update-team.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../team.service'; // Assicurati di importare correttamente il servizio TeamService
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
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
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const teamId = this.route.snapshot.paramMap.get('id');
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
        }
      );
    } else {
      // Form non valido, gestisci eventuali errori
    }
  }

}
