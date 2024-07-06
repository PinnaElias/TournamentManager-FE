import { Component, OnInit } from '@angular/core';
import { BracketService } from './bracket.service';
import { Bracket, CreateBracketRequestBody, UpdateBracketRequestBody, DeleteBracketResponseBody, BracketType } from '../models/bracket.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';


@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  brackets: Bracket[] = [];
  newBracket: CreateBracketRequestBody = { bracketType: BracketType.SINGLE_ELIMINATION, participants: [] };
  updateBracket: UpdateBracketRequestBody = { };

  BracketType = BracketType; // Rendi accessibile l'enum nel template

  constructor(private bracketService: BracketService) {}

  ngOnInit() {
    this.getBrackets();
  }

  getBrackets() {
    this.bracketService.getAllBrackets(0, 10, 'id').subscribe((data: any) => {
      this.brackets = data.content;
    });
  }

  addBracket() {
    this.bracketService.createBracket(this.newBracket).subscribe(() => {
      this.getBrackets();
    });
  }

  editBracket(id: string) {
    this.bracketService.updateBracket(id, this.updateBracket).subscribe(() => {
      this.getBrackets();
    });
  }

  deleteBracket(id: string) {
    this.bracketService.deleteBracket(id).subscribe(() => {
      this.getBrackets();
    });
  }
}