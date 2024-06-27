import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFormComponent } from './team-forms.component';

describe('TeamFormsComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamFormComponent]
    });
    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
