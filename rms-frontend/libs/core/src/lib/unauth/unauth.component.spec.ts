import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthComponent } from './unauth.component';
import { CoreModule } from '../core.module';

describe('UnauthComponent', () => {
  let component: UnauthComponent;
  let fixture: ComponentFixture<UnauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CoreModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
