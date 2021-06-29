import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import {faCalendar,faStar, faArrowRight, faTimes, faUserGraduate, faSchool} from '@fortawesome/free-solid-svg-icons';
import { CarrerasService } from 'src/app/services/carreras.service';
import { AcademiasService } from 'src/app/services/academias.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  eventosFavoritos = []
  carrerasFavoritas = []
  academiasFavoritas = []
  faCalendar = faCalendar;
  faStar = faStar
  faArrowRight = faArrowRight
  faTimes = faTimes
  faUserGraduate = faUserGraduate
  faSchool = faSchool
  

  constructor(
    private eventosSvc: EventosService,
    private carrerasSvc: CarrerasService,
    private academiasSvc: AcademiasService
  ) { }

  ngOnInit(): void {
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.eventosSvc.getFavoritosByUsuario(idusuario).subscribe(data => this.eventosFavoritos = data)
    this.carrerasSvc.getCarrerasFavoritasByUsuario(idusuario).subscribe(data => this.carrerasFavoritas = data)
    this.academiasSvc.getAcademiasFavoritasByUsuario(idusuario).subscribe(data => this.academiasFavoritas = data)
  }

  deleteEventoFavorito(idevento:Number, idusuario:Number){
    this.eventosSvc.deleteFavorito(idevento, idusuario).subscribe(data => {
      this.eventosFavoritos = this.eventosFavoritos.filter(favEve => favEve.idevento.idevento !== idevento)
    })
  }


  deleteCarreraFavorita(idcarrera:Number, idusuario:Number){
    this.carrerasSvc.deleteFavorito(idcarrera, idusuario).subscribe(data => {
      this.carrerasFavoritas = this.carrerasFavoritas.filter(carFav => carFav.idcarrera.idcarrera !== idcarrera)
    })
  }

  deleteAcademiaFavorita(idacademia:Number, idusuario:Number){
    this.academiasSvc.deleteFavorita(idacademia, idusuario).subscribe(data => {
      this.academiasFavoritas = this.academiasFavoritas.filter(academia => academia.idacademia.idacademia !== idacademia)
    })
  }

}
