import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Carrera } from 'src/app/compartido/models/Carrera';
import { CarrerasService } from 'src/app/services/carreras.service';
import { UniversidadesService } from 'src/app/services/universidades.service';
import {faUserGraduate, faLink, faStar, faUniversity} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detalle-carrera',
  templateUrl: './detalle-carrera.component.html',
  styleUrls: ['./detalle-carrera.component.scss']
})
export class DetalleCarreraComponent implements OnInit {

  carrera: Carrera
  universidadesWithCarrera = []
  moreDetails = false
  faUserGraduate = faUserGraduate
  faStar = faStar
  faLink = faLink
  faUniversity = faUniversity

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private universidadSvc: UniversidadesService,
    private carrerasSvc: CarrerasService
  ) { }

  ngOnInit(): void {
    let idcarrera =  Number(this.route.snapshot.paramMap.get('idcarrera'));
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
}
