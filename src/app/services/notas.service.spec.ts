import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NotasService } from './notas.service';

describe('NotasService', () => {
  let service: NotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [NotasService]
    });
    service = TestBed.inject(NotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getNota', () => {
    service.getNota(3, 20).subscribe(nota => {
      expect(nota.idasignatura.idasignatura).toBe(20);
      expect(nota.calificacion_1).toBe(5);
      expect(nota.calificacion_2).toBe(10);
      expect(nota.calificacion_3).toBe(10);
    })
  });

  it('getNotasByIdUsuario', () => {
    service.getNotasByIdUsuario(3).subscribe(notas => {
      expect(notas.length).toBe(3);
    })
  });

  it('getNotasSuspendidas', () => {
    service.getNotasSuspendidasByUsuario(3).subscribe(notas => {
      expect(notas.length).toBe(1);
    })
  });

  it('getNotasSobresalientes', () => {
    service.getNotasSobresalientes(3).subscribe(notas => {
      expect(notas.length).toBe(3);
    })
  });
});
