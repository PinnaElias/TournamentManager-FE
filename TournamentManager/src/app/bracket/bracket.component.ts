import { Component, OnInit, Input } from '@angular/core';
import { BracketService } from './bracket.service';
import { Bracket } from '../models/bracket.model';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  @Input() tournamentId!: string;
  bracket!: Bracket;

  constructor(private bracketService: BracketService) { }

  ngOnInit(): void {
    this.loadBracket();
  }

  loadBracket(): void {
    this.bracketService.getBracketByTournamentId(this.tournamentId).subscribe(
      bracket => {
        this.bracket = bracket;
        console.log('Bracket:', this.bracket);  // Debugging
      },
      error => {
        console.error('Error loading bracket:', error);
      }
    );
  }
}
