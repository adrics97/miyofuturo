import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from 'src/app/compartido/models/Evento';
import {faCalendar, faMapMarkerAlt, faStar, faLink, faArrowDown,faArrowUp} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoFavorito } from 'src/app/compartido/models/EventoFavorito';
import { User } from 'src/app/compartido/models/User';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

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
  faArrowUp = faArrowUp
  eventoForm: FormGroup
  formActivated = false
  idusuario: Number
  fk_usuario: User
  newEventoFavorito: EventoFavorito = new EventoFavorito()
  eventoFormUpdate: EventoFavorito = new EventoFavorito()

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
    this.usuariosSvc.getUsuario(this.idusuario).subscribe(data => {this.fk_usuario = data})
    this.eventosSvc.getEvento(idevento).subscribe(data => {this.evento = data,console.log(this.evento)});
    this.eventosSvc.getEventoFavorito(idevento, this.idusuario).subscribe(data => {
      if(data != null)
        this.eventoFormUpdate = data
    })

   
    this.initEventoForm();
    
  }

  initEventoForm(){
    this.eventoForm = this.fb.group({
      valoracion: [this.eventoFormUpdate.valoracion],
      comentario: [this.eventoFormUpdate.comentario]
    })
  }

  volver():void{
    this.location.back();
  }

  changeFormActivated(){
    if (!this.formActivated)
      this.formActivated = true;
    else
      this.formActivated = false;
  }

  addFavoritos(idevento:Number){
    this.eventosSvc.getEventoFavorito(this.evento.idevento, this.idusuario).subscribe(data => {
      console.log(data)
      if(data == null){ //NO HA SIDO CREADA
        console.log(idevento)
        this.newEventoFavorito.idevento=this.evento;
        this.newEventoFavorito.idusuario=this.fk_usuario;
        this.eventosSvc.addFavorito(this.newEventoFavorito).subscribe(data => {
          Swal.fire("Evento añadido a favoritos", 'Correctamente', 'success');
        })
      }else{
        Swal.fire("Este evento ya ha sido añadido", '', 'warning');
      }
    })   
  }

  addForm(){
    this.eventosSvc.getEventoFavorito(this.evento.idevento, this.idusuario).subscribe(data => {
      console.log(data)
      let form = this.eventoForm.value
      this.newEventoFavorito.idevento=this.evento;
      this.newEventoFavorito.idusuario=this.fk_usuario;
      this.newEventoFavorito.valoracion=form.valoracion
      this.newEventoFavorito.comentario=form.comentario
      if(data == null){ //NO HA SIDO CREADA
        this.addFavoritos(this.evento.idevento)
      }
      else{
        this.eventosSvc.updateFavorito(this.evento.idevento, this.idusuario, this.newEventoFavorito).subscribe(data => {
          this.eventoFormUpdate = data
          Swal.fire("Valoración enviada", 'Correctamente', 'success');
          this.eventoForm.reset({
            valoracion: 5,
            comentario: ''
          })
        })
      }
    })
    
  }

}
