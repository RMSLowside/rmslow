import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CoreModule } from '@rms-frontend/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Part1Component } from './part1/part1.component';
import { TabContent1Component } from './tab-content1/tab-content1.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, Part1Component, TabContent1Component],
      imports: [CoreModule, BrowserModule, BrowserAnimationsModule]
    })
      .overrideModule(BrowserModule, {
        set: { entryComponents: [Part1Component, TabContent1Component] }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`lazyLoadComponent1 and lazyLoadTabContent1 should have been called`, async(() => {
    spyOn(component, 'lazyLoadComponent1');
    spyOn(component, 'lazyLoadTabContent1');
    fixture.detectChanges();
    component.ngAfterViewInit();

    expect(component.lazyLoadComponent1).toHaveBeenCalled();
    expect(component.lazyLoadTabContent1).toHaveBeenCalled();
  }));
});
