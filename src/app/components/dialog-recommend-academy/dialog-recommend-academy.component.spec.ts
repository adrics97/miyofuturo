import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecommendAcademyComponent } from './dialog-recommend-academy.component';

describe('DialogRecommendAcademyComponent', () => {
  let component: DialogRecommendAcademyComponent;
  let fixture: ComponentFixture<DialogRecommendAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecommendAcademyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecommendAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
