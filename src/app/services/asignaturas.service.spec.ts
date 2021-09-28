import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Asignatura } from '../compartido/models/Asignatura';

import { AsignaturasService } from './asignaturas.service';

describe('AsignaturasService', () => {
  let service: AsignaturasService;
  let newAsig: Asignatura;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AsignaturasService]
    });
    service = TestBed.inject(AsignaturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAsignaturasByName', () => {
    service.getAsignaturaByNombre("Matematicas I").subscribe(asig => {
      expect(asig.nombre).toBe('Matematicas I');
    })
  })

  it('getAsignaturas', () => {
    service.getAsignatura(23).subscribe(asig => {
      expect(asig.nombre).toBe('Matematicas I');
      expect(asig.idasignatura).toBe(23);
    })
  })

  xit('createAsignatura', () => {
    newAsig = new Asignatura();
    newAsig.nombre = 'Catalan';
    service.createAsignatura(newAsig).subscribe(asig => {
      expect(asig.nombre).toBe('Catalan');
    })
  })


});
