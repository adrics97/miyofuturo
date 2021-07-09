import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecommendEventComponent } from './dialog-recommend-event.component';

describe('DialogRecommendEventComponent', () => {
  let component: DialogRecommendEventComponent;
  let fixture: ComponentFixture<DialogRecommendEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecommendEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecommendEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
