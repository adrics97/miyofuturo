import { HttpClient, HttpClientModule} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} 
       from '@angular/common/http/testing';

import { AcademiasService } from './academias.service';

describe('AcademiasService', () => {
  let httpTestingController: HttpTestingController;
  let service: AcademiasService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AcademiasService]
    });
    service = TestBed.inject(AcademiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('academias length = 3', () => {
    service.getAcademias().subscribe(academias => {
      expect(academias.length).toBe(3);
    });
  });

  it('academias names', () => {
    service.getAcademias().subscribe(academias => {
      expect(academias[0].nombre).toBe('Academia Julia');
      expect(academias[1].direccion).toBe('Castellon');
    });
  });

  it('Academias ciudad = Castellon', () => {
    service.getAcademiasByCiudad('Castellon').subscribe(academias => {
      expect(academias[0].ciudad).toBe('Castellon');
    });
  });

  it('Academia únicas', () => {
    service.getAcademia(1).subscribe(academia => {
      expect(academia.nombre).toBe('Academia Julia');
    });
  });
})
