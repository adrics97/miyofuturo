import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UniversidadesService } from './universidades.service';

describe('UniversidadesService', () => {
  let service: UniversidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UniversidadesService]
    });
    service = TestBed.inject(UniversidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUniversidades', () => {
    service.getUniversidades().subscribe(universidades => {
      expect(universidades.length).toBe(4);
    })
  });

  it('getUniversidadesByComunidad', () => {
    service.getUniversidadesByComunidad('Comunidad Valenciana').subscribe(universidades => {
      expect(universidades.length).toBe(3);
    })
  });

  it('getUniversidadesByProvincia', () => {
    service.getUniversidadesByProvincia('Valencia','Comunidad Valenciana').subscribe(universidades => {
      expect(universidades.length).toBe(2);
    })
  });


  it('getUniversidad', () => {
    service.getUniversidad(1).subscribe(universidad => {
      expect(universidad.nombre).toBe('Universitat Jaume I');
    })
  });


});
