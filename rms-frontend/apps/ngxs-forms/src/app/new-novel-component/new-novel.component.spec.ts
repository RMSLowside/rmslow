import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNovelComponent } from './new-novel.component';

describe('NewNovelComponentComponent', () => {
  let component: NewNovelComponent;
  let fixture: ComponentFixture<NewNovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
