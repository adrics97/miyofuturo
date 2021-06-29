import { Component, OnInit } from '@angular/core';
import {faSchool, faSearch, faInfo} from '@fortawesome/free-solid-svg-icons';
import { CIUDADES } from 'src/app/compartido/models/Ciudades';
import { AcademiasService } from 'src/app/services/academias.service';

@Component({
  selector: 'app-academias',
  templateUrl: './academias.component.html',
  styleUrls: ['./academias.component.scss']
})
export class AcademiasComponent implements OnInit {


  ciudades: String[] = CIUDADES
  academias = []
  selectedCiudad = ''
  faSchool = faSchool
  faSearch = faSearch
  faInfo = faInfo

  constructor(
    private academiasSvc: AcademiasService
  ) { }

  ngOnInit(): void {
   this.academiasSvc.getAcademias().subscribe(data => this.academias = data)
  }

  searchByCity(ciudad: string){
    if(ciudad != "Ninguna")
      this.academiasSvc.getAcademiasByCiudad(ciudad).subscribe(data => {
        this.academias = data
    })
    else{
      this.academiasSvc.getAcademiasByCiudad(ciudad).subscribe(data => this.academias=data)
    }

  }

}
