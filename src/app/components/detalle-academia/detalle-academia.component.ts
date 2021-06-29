import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {faSchool, faLink, faStar, faMapSigns, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { Academia } from 'src/app/compartido/models/Academia';
import { AcademiasService } from 'src/app/services/academias.service';
import { AcademiaFavorita } from 'src/app/compartido/models/AcademiaFavorita';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-academia',
  templateUrl: './detalle-academia.component.html',
  styleUrls: ['./detalle-academia.component.scss']
})
export class DetalleAcademiaComponent implements OnInit {

  academia: Academia
  newAcademiaFavorita: AcademiaFavorita = new AcademiaFavorita()
  faSchool = faSchool
  faStar = faStar
  faLink = faLink
  faMapSigns = faMapSigns
  faMapMarkerAlt = faMapMarkerAlt


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private academiasSvc: AcademiasService,
    private usuariosSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    let idacademia =  Number(this.route.snapshot.paramMap.get('idacademia'));
    this.academiasSvc.getAcademia(idacademia).subscribe(data => this.academia = data)
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => {this.newAcademiaFavorita.idusuario = data})
  }

  
  volver():void{
    this.location.back();
  }

  addFavoritos(){
    this.newAcademiaFavorita.idacademia = this.academia
    this.academiasSvc.getAcademiaFavorita(this.academia.idacademia, this.newAcademiaFavorita.idusuario.idusuario)
      .subscribe(data => {
        if (data == null){
          this.academiasSvc.addFavorita(this.newAcademiaFavorita).subscribe(data => {
            console.log(data)
            Swal.fire("Academia añadida a favoritos", 'Correctamente', 'success');
          })
        }
        else{
          Swal.fire("Academia ya añadida a favoritas", '', 'warning');
        }
      })
  }


}
