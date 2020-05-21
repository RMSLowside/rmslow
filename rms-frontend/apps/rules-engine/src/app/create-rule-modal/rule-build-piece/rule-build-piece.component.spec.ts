import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleBuildPieceComponent } from './rule-build-piece.component';

describe('HelpEditComponent', () => {
  let component: RuleBuildPieceComponent;
  let fixture: ComponentFixture<RuleBuildPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleBuildPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleBuildPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
