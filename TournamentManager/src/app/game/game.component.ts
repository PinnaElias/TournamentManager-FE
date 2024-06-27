import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from '../models/game.model';
import { Page } from '../models/team.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gamesPage!: Page<Game>;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getAllGames().subscribe(
      (data: Page<Game>) => {
        this.gamesPage = data;
        console.log('Games loaded:', this.gamesPage.content);  
      },
      (error) => {
        console.error('Error loading games:', error);
      }
    );
  }

  getGameDetails(id: string) {
    this.gameService.getGameById(id).subscribe(
      (game: Game) => {
        console.log('Game details:', game);  
      },
      (error) => {
        console.error('Error loading game details:', error);
      }
    );
  }
}
