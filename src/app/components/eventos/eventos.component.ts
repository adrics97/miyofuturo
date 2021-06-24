import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/compartido/models/Evento';
import { EventosService } from 'src/app/services/eventos.service';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  faCalendar = faCalendar;
  eventos: Evento[];
  constructor(
    private eventosSvc: EventosService
  ) { }

  ngOnInit(): void {
    this.eventosSvc.getEventos().subscribe(data => this.eventos=data)
  }

}
