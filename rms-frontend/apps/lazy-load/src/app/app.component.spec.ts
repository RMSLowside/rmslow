import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@rms-frontend/core';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CoreModule
      ]
    }).compileComponents();
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

  it(`lazyLoadComponent1 and lazyLoadTabContent1 should have been called`, async(() => {
    spyOn(app, 'lazyLoadComponent1');
    spyOn(app, 'lazyLoadTabContent1');
    fixture.detectChanges();

    expect(app.lazyLoadComponent1).toHaveBeenCalled();
    expect(app.lazyLoadTabContent1).toHaveBeenCalled();
  })); 
});
