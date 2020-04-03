import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabContent3Component } from './tab-content3.component';

describe('TabContent3Component', () => {
  let component: TabContent3Component;
  let fixture: ComponentFixture<TabContent3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabContent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
