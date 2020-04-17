import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HeaderModule } from '@rms-frontend/header';

describe('AppComponent', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        HeaderModule,
        RouterTestingModule.withRoutes([]),
        NgxsModule.forRoot([])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.returnValue(null);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'home'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Home');
  });

  it(`should call setTheme`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.themeChange('dark');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
