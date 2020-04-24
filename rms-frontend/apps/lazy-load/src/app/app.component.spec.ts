import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@rms-frontend/core';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { HeaderModule, HeaderComponent } from '@rms-frontend/header';
import { BrowserModule } from '@angular/platform-browser';

describe('AppComponent', () => {
  let store: Store;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        CoreModule,
        HeaderModule,
        RouterTestingModule.withRoutes([]),
        NgxsModule.forRoot([])
      ]
    })
      .overrideModule(BrowserModule, {
        set: { entryComponents: [HeaderComponent] }
      })
      .compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.returnValue(null);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    app = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    debugElement = null;
    app = null;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lazy-load'`, () => {
    expect(app.title).toEqual('lazy-load');
  });
  it(`should load the header`, () => {
    fixture.detectChanges();
    app.loadHeader();
    setTimeout(() => {
      expect(app.headerRef).toBeDefined();
    }, 50);
  });
});
