import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Carrera } from 'src/app/compartido/models/Carrera';
import { CarrerasService } from 'src/app/services/carreras.service';
import { UniversidadesService } from 'src/app/services/universidades.service';
import {faUserGraduate, faLink, faStar, faUniversity} from '@fortawesome/free-solid-svg-icons';
import { CarreraFavorita } from 'src/app/compartido/models/CarreraFavorita';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-detalle-carrera',
  templateUrl: './detalle-carrera.component.html',
  styleUrls: ['./detalle-carrera.component.scss']
})
export class DetalleCarreraComponent implements OnInit {

  carrera: Carrera
  universidadesWithCarrera = []
  newCarreraFavorita: CarreraFavorita = new CarreraFavorita()
  moreDetails = false
  faUserGraduate = faUserGraduate
  faStar = faStar
  faLink = faLink
  faUniversity = faUniversity

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private universidadSvc: UniversidadesService,
    private carrerasSvc: CarrerasService,
    private usuariosSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    let idcarrera =  Number(this.route.snapshot.paramMap.get('idcarrera'));
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => {this.newCarreraFavorita.idusuario = data})
    this.carrerasSvc.getCarrera(idcarrera).subscribe(data => this.carrera = data)
    this.universidadSvc.getUniversidadesByCarrera(idcarrera).subscribe(data => this.universidadesWithCarrera = data)
  }

  volver():void{
    this.location.back();
  }

  changeMoreDetails(){
    if (!this.moreDetails)
      this.moreDetails = true;
    else
      this.moreDetails = false;
  }

  addFavoritos(){
    this.newCarreraFavorita.idcarrera = this.carrera
    this.carrerasSvc.getCarreraFavorita(this.carrera.idcarrera, this.newCarreraFavorita.idusuario.idusuario)
      .subscribe(data => {
        if (data == null){
          this.carrerasSvc.addFavorita(this.newCarreraFavorita).subscribe(data => {
            console.log(data)
            Swal.fire("Carrera añadida a favoritos", 'Correctamente', 'success');
          })
        }
        else{
          Swal.fire("Carrera ya añadida a favoritas", '', 'warning');
        }
      })
  }

}
