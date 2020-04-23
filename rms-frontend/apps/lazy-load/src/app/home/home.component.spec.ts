import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CoreModule } from '@rms-frontend/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Part1Component } from './part1/part1.component';
import { TabContent1Component } from './tab-content1/tab-content1.component';
import { Part2Component } from './part2/part2.component';
import { Part3Component } from './part3/part3.component';
import { GridComponent } from '@rms-frontend/grid';
import { FileExplorerComponent } from '@rms-frontend/file-explorer';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: Element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        Part1Component,
        TabContent1Component,
        Part2Component,
        Part3Component,
        GridComponent
        //FileExplorerComponent
      ],
      imports: [CoreModule, BrowserModule, BrowserAnimationsModule]
    })
      .overrideModule(BrowserModule, {
        set: {
          entryComponents: [
            Part1Component,
            TabContent1Component,
            Part2Component,
            Part3Component,
            GridComponent
            //FileExplorerComponent
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
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

  it(`lazyLoadTabContent1 should have been called`, async(() => {
    spyOn(component, 'lazyLoadTabContent1');
    spyOn(component, 'lazyLoadGrid');
    spyOn(component, 'lazyLoadFileExplorer');
    fixture.detectChanges();
    component.tabSelectionChanged({ tab: { textLabel: 'Frst' } });

    expect(component.lazyLoadTabContent1).toHaveBeenCalled();
    expect(component.lazyLoadGrid).not.toHaveBeenCalled();
    expect(component.lazyLoadFileExplorer).not.toHaveBeenCalled();
  }));

  it(`lazyLoadFileExplorer should have been called`, async(() => {
    spyOn(component, 'lazyLoadTabContent1');
    spyOn(component, 'lazyLoadGrid');
    spyOn(component, 'lazyLoadFileExplorer');
    fixture.detectChanges();
    component.tabSelectionChanged({ tab: { textLabel: 'File Explorer' } });

    expect(component.lazyLoadTabContent1).not.toHaveBeenCalled();
    expect(component.lazyLoadGrid).not.toHaveBeenCalled();
    expect(component.lazyLoadFileExplorer).toHaveBeenCalled();
  }));

  it(`lazyLoadGrid should have been called`, async(() => {
    spyOn(component, 'lazyLoadTabContent1');
    spyOn(component, 'lazyLoadGrid');
    spyOn(component, 'lazyLoadFileExplorer');
    fixture.detectChanges();
    component.tabSelectionChanged({ tab: { textLabel: 'Grid' } });

    expect(component.lazyLoadTabContent1).not.toHaveBeenCalled();
    expect(component.lazyLoadGrid).toHaveBeenCalled();
    expect(component.lazyLoadFileExplorer).not.toHaveBeenCalled();
  }));

  it(`none should have been called`, async(() => {
    spyOn(component, 'lazyLoadTabContent1');
    spyOn(component, 'lazyLoadGrid');
    spyOn(component, 'lazyLoadFileExplorer');
    fixture.detectChanges();
    component.tabSelectionChanged({ tab: { textLabel: 'TEST' } });

    expect(component.lazyLoadTabContent1).not.toHaveBeenCalled();
    expect(component.lazyLoadGrid).not.toHaveBeenCalled();
    expect(component.lazyLoadFileExplorer).not.toHaveBeenCalled();
  }));
  it(`should load the part2`, () => {
    fixture.detectChanges();
    component.lazyLoadPart2();
    setTimeout(() => {
      expect(component.twoRef).toBeDefined();
    }, 50);
  });
  it(`should load the part3`, () => {
    fixture.detectChanges();
    component.lazyLoadPart3();
    setTimeout(() => {
      expect(component.threeRef).toBeDefined();
    }, 50);
  });
});
