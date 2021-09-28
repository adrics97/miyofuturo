import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { EventosService } from 'src/app/services/eventos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {faCalendar, faSearch} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventosCercanos = []
  slides: any = [[]];
  faCalendar = faCalendar;
  constructor(
    private usuariosSvc: UsuariosService,
    private eventosSvc: EventosService
  ) { }

   async ngOnInit() {
    this.eventosSvc.getEventosCercanos().subscribe(data => {this.eventosCercanos=data})
    let email = JSON.parse(localStorage.getItem('email'));
    this.usuariosSvc.getUsuarioByEmail(email).subscribe(data => {
      localStorage.setItem('idusuario', JSON.stringify(data.idusuario));
    })
    
    await this.delay(500);
    this.slides =  this.chunk(this.eventosCercanos, 1);
    
  }

  chunk(arr,chunkSize) {
    let R = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
