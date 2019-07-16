import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorypostComponent } from './historypost.component';

describe('HistorypostComponent', () => {
  let component: HistorypostComponent;
  let fixture: ComponentFixture<HistorypostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorypostComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
