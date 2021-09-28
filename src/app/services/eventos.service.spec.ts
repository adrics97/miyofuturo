import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { EventosService } from './eventos.service';

describe('EventosService', () => {
  let service: EventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EventosService]
    });
    service = TestBed.inject(EventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEventos', () => {
    service.getEventos().subscribe(eventos => {
      expect(eventos.length).toBeGreaterThan(0);
    })
  });

  it('getEvento', () => {
    service.getEvento(1).subscribe(evento => {
      expect(evento.nombre).toBe('Olimpiadas matematicas');
    })
  });

  it('getEventosFavorito', () => {
    service.getEventoFavorito(1,3).subscribe(evento => {
      expect(evento.idevento.nombre).toBe('Olimpiadas matematicas');
    })
  });

  
  it('getEventosByCity', () => {
    service.getEventosByCity('Castellon').subscribe(eventos => {
      expect(eventos.length).toBe(2);
    })
    service.getEventosByCity('Valencia').subscribe(eventos => {
      expect(eventos.length).toBe(3);
    })
  });  

    
  it('getEventosCercanos', () => {
    service.getEventosCercanos().subscribe(eventos => {
      expect(eventos.length).toBe(1);
      expect(eventos[0].nombre).toBe('Feria de empresas');
    })
  });  

      
  it('getEventosRecomendadors', () => {
    service.getEventosRecomendados().subscribe(eventos => {
      expect(eventos.length).toBe(2);
    })
  });  


});
