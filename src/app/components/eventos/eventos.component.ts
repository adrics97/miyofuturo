import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/compartido/models/Evento';
import { EventosService } from 'src/app/services/eventos.service';
import {faCalendar, faSearch} from '@fortawesome/free-solid-svg-icons';
import { CIUDADES } from 'src/app/compartido/models/Ciudades';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  faCalendar = faCalendar;
  faSearch = faSearch;
  eventos: Evento[];
  ciudades: String[] = CIUDADES
  selectedCiudad = ''
  constructor(
    private eventosSvc: EventosService
  ) { }

  ngOnInit(): void {
    this.eventosSvc.getEventos().subscribe(data => this.eventos=data)
  }

  searchByCity(ciudad: string){
    if(ciudad != "Ninguna")
      this.eventosSvc.getEventosByCity(ciudad).subscribe(data => {
        this.eventos = data
    })
    else{
      this.eventosSvc.getEventos().subscribe(data => this.eventos=data)
    }
  }

}
