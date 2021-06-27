import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadesCarrerasComponent } from './universidades-carreras.component';

describe('UniversidadesComponent', () => {
  let component: UniversidadesCarrerasComponent;
  let fixture: ComponentFixture<UniversidadesCarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversidadesCarrerasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversidadesCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
