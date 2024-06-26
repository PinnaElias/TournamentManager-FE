import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tournaments: any[] = [];
  filteredTournaments: any[] = [];
  searchTerm: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.homeService.getAllTournaments().subscribe(response => {
      this.tournaments = response.content;
      this.filteredTournaments = this.tournaments;
    });
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.filteredTournaments = this.searchTerm 
      ? this.tournaments.filter(tournament => 
          tournament.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.tournaments;
  }
}
