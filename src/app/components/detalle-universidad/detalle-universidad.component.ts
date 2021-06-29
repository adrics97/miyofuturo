import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Universidad } from 'src/app/compartido/models/Universidad';
import { UniversidadesService } from 'src/app/services/universidades.service';
import {faUniversity, faLink, faStar, faMapMarkerAlt, faUserGraduate} from '@fortawesome/free-solid-svg-icons';
import { CarrerasService } from 'src/app/services/carreras.service';
import { Carrera } from 'src/app/compartido/models/Carrera';

@Component({
  selector: 'app-detalle-universidad',
  templateUrl: './detalle-universidad.component.html',
  styleUrls: ['./detalle-universidad.component.scss']
})
export class DetalleUniversidadComponent implements OnInit {

  universidad: Universidad
  carrerasByUniversidad = []
  selectedGrado?: Carrera
  faUniversity = faUniversity
  faLink = faLink
  faStar = faStar
  faMapMarkerAlt = faMapMarkerAlt
  faUserGraduate = faUserGraduate

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private universidadSvc: UniversidadesService,
    private carrerasSvc: CarrerasService
  ) { }

  ngOnInit(): void {
    let iduniversidad = Number(this.route.snapshot.paramMap.get('iduniversidad'));
    this.universidadSvc.getUniversidad(iduniversidad).subscribe(data => this.universidad = data);
    this.carrerasSvc.getCarrerasByUniversidad(iduniversidad).subscribe(data => this.carrerasByUniversidad = data);
  }

  volver():void{
    this.location.back();
  }

  changeMoreDetails(grado: Carrera){
    if (this.selectedGrado == null)
      this.selectedGrado = grado
    else
      this.selectedGrado = null
  }

}
