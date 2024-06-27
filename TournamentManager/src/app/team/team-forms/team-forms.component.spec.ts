import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormsComponent } from './team-forms.component';

describe('TeamFormsComponent', () => {
  let component: TeamFormsComponent;
  let fixture: ComponentFixture<TeamFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamFormsComponent]
    });
    fixture = TestBed.createComponent(TeamFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
