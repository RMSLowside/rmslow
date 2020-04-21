import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameModalComponent } from './rename-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('RenameModalComponent', () => {
  let component: RenameModalComponent;
  let fixture: ComponentFixture<RenameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        BrowserAnimationsModule
      ],
      declarations: [RenameModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
