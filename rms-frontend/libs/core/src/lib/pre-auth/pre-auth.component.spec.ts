import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAuthComponent } from './pre-auth.component';
import { CoreModule } from '../core.module';
import { NgxsModule } from '@ngxs/store';

describe('PreAuthComponent', () => {
  let component: PreAuthComponent;
  let fixture: ComponentFixture<PreAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CoreModule, NgxsModule.forRoot([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
