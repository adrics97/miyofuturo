import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAcademiaComponent } from './detalle-academia.component';

describe('DetalleAcademiaComponent', () => {
  let component: DetalleAcademiaComponent;
  let fixture: ComponentFixture<DetalleAcademiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAcademiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAcademiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
