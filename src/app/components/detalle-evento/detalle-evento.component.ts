import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from 'src/app/compartido/models/Evento';
import {faCalendar, faMapMarkerAlt, faStar, faLink, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoFavorito } from 'src/app/compartido/models/EventoFavorito';
import { User } from 'src/app/compartido/models/User';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.scss']
})
export class DetalleEventoComponent implements OnInit {

  evento: Evento
  faCalendar = faCalendar
  faMapMarkerAlt = faMapMarkerAlt
  faStar = faStar
  faLink = faLink
  faArrowDown = faArrowDown
  eventoForm: FormGroup
  formActivated = false
  idusuario: Number
  fk_usuario: User
  newEventoFavorito: EventoFavorito = new EventoFavorito()

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private eventosSvc: EventosService,
    private usuariosSvc: UsuariosService,
    private fb: FormBuilder 
  ) { }

  ngOnInit(): void {
    let idevento = Number(this.route.snapshot.paramMap.get('idevento'));
    this.idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.usuariosSvc.getUsuario(this.idusuario).subscribe(data => {console.log(data), this.fk_usuario = data})
    this.eventosSvc.getEvento(idevento).subscribe(data => this.evento = data);

    this.initEventoForm();
    
  }

  initEventoForm(){
    this.eventoForm = this.fb.group({
      valoracion: [0],
      comentario: ['']
    })
  }

  volver():void{
    this.location.back();
  }

  addFavoritos(idevento:Number){
    console.log(idevento)
    this.newEventoFavorito.idevento=this.evento;
    this.newEventoFavorito.idusuario=this.fk_usuario;
    this.eventosSvc.addFavorito(this.newEventoFavorito).subscribe(data => console.log(data))
  }

  addForm(){
  }

}
