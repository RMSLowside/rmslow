import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContent1Component } from './tab-content1.component';

describe('TabContent1Component', () => {
  let component: TabContent1Component;
  let fixture: ComponentFixture<TabContent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
