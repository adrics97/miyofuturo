import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import {faCalendar,faStar, faArrowRight, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  favoritosEventos = []
  faCalendar = faCalendar;
  faStar = faStar
  faArrowRight = faArrowRight
  faTimes = faTimes
  

  constructor(
    private eventosSvc: EventosService
  ) { }

  ngOnInit(): void {
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.eventosSvc.getFavoritosByUsuario(idusuario).subscribe(data => this.favoritosEventos = data)
  
  }

  deleteFavorito(idevento:Number, idusuario:Number){
    this.eventosSvc.deleteFavorito(idevento, idusuario).subscribe(data => {
      this.favoritosEventos = this.favoritosEventos.filter(favEve => favEve.idevento.idevento !== idevento)
    })
  }


}
