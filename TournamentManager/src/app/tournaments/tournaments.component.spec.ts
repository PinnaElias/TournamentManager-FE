import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentComponent } from './tournaments.component';

describe('TournamentsComponent', () => {
  let component: TournamentComponent;
  let fixture: ComponentFixture<TournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentComponent]
    });
    fixture = TestBed.createComponent(TournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
