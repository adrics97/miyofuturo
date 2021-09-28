import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CarreraFavorita } from '../compartido/models/CarreraFavorita';
import { User } from '../compartido/models/User';

import { CarrerasService } from './carreras.service';
import { UsuariosService } from './usuarios.service';

describe('CarrerasService', () => {
  let service: CarrerasService;
  let userSvc: UsuariosService;
  let newCarreraFav: CarreraFavorita

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CarrerasService, UsuariosService]
    });
    service = TestBed.inject(CarrerasService);
    userSvc = TestBed.inject(UsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getCarreras', () => {
    service.getCarreras().subscribe(carreras => {
      expect(carreras.length).toBe(3);
    })
  })


  it('getCarreraByID', () => {
    service.getCarrera(1).subscribe(carrera => {
      expect(carrera.nombre).toBe('Grado en Ingeniería Informática');
      expect(carrera.idcarrera).toBe(1);
      expect(carrera.area).toBe('Ingeniería y Arquitectura');
    })
  })

  xit('getCarreraByArea', () => {
    service.getCarrerasByArea('Ingeniería y Arquitectura').subscribe(carreras => {
      expect(carreras.length).toBe(2);
    })
  })

  it('getCarreraByUniversidad', () => {
    service.getCarrerasByUniversidad(1).subscribe(carreras => {
      expect(carreras.length).toBe(3);
    })
  })

  it('getCarreraFavoritasByUsuario', () => {
    service.getCarrerasFavoritasByUsuario(3).subscribe(carreras => {
      expect(carreras.length).toBe(1);
    })
  })

  it('getCarreraFavoritasByUsuario', () => {
    service.getCarreraFavorita(1,3).subscribe(carrera => {
      expect(carrera.idcarrera.nombre).toBe('Grado en Ingeniería Informática');
    })
  })

  xit('addCarreraFavoritos', () => {
    newCarreraFav = new CarreraFavorita();
    service.getCarrera(2).subscribe(car => newCarreraFav.idcarrera = car);
    userSvc.getUsuario(3).subscribe(user => newCarreraFav.idusuario = user);
    service.addFavorita(newCarreraFav).subscribe(carrera => {
      expect(carrera.idcarrera.nombre).toBe('Grado en Química');
    })
  })
  
});
