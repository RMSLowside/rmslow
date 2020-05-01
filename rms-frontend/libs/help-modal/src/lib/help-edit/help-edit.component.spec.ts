import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpEditComponent } from './help-edit.component';

describe('HelpEditComponent', () => {
  let component: HelpEditComponent;
  let fixture: ComponentFixture<HelpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
