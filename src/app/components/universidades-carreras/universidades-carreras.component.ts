import { Component, OnInit } from '@angular/core';
import {faSearch, faUniversity, faUserGraduate, faInfo} from '@fortawesome/free-solid-svg-icons';
import { AREAS } from 'src/app/compartido/models/Areas';
import { CIUDADES } from 'src/app/compartido/models/Ciudades';
import { COMUNIDADES } from 'src/app/compartido/models/Comunidades';
import { PROVINCIAS } from 'src/app/compartido/models/Provincias';
import { CarrerasService } from 'src/app/services/carreras.service';
import { UniversidadesService } from 'src/app/services/universidades.service';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades-carreras.component.html',
  styleUrls: ['./universidades-carreras.component.scss']
})
export class UniversidadesCarrerasComponent implements OnInit {

  faSearch = faSearch;
  faUniversity = faUniversity;
  faUserGraduate = faUserGraduate;
  faInfo = faInfo;
  universidades = []
  carreras = []
  comunidades: String[] = COMUNIDADES
  provincias: String[] 
  areas: String[] = AREAS
  selectedComunidad = ''
  searchComunidad = false
  selectedProvincia = ''
  selectedArea = ''

  constructor(
    private universidadesSvc: UniversidadesService,
    private carrerasSvc: CarrerasService
  ) { }

  ngOnInit(): void {
    this.universidadesSvc.getUniversidades().subscribe(data => this.universidades = data)
    this.carrerasSvc.getCarreras().subscribe(data => this.carreras = data)
  }

  searchByComunidad(comunidad: string){
    this.searchComunidad = true
    if(comunidad != "Todas"){
        this.universidadesSvc.getUniversidadesByComunidad(comunidad).subscribe(data => {this.universidades = data})
        this.provincias = PROVINCIAS.get(comunidad)
    }
    else{
      this.universidadesSvc.getUniversidades().subscribe(data => this.universidades=data)
      this.provincias = PROVINCIAS.get(comunidad)
    }
    
    console.log(this.provincias)
  }

  searchByProvincia(provincia: string, selectedComunidad: string){
    if(provincia != "Todas")
      this.universidadesSvc.getUniversidadesByProvincia(provincia, selectedComunidad).subscribe(data => {
        this.universidades = data
    })
    else{
      this.universidadesSvc.getUniversidades().subscribe(data => this.universidades=data)
    }
  }

  searchByArea(area: string){
    if(area != "Todas")
      this.carrerasSvc.getCarrerasByArea(area).subscribe(data => {
        this.carreras = data
    })
    else{
      this.carrerasSvc.getCarreras().subscribe(data => this.carreras=data)
    }
  }

}
