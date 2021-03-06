import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nota } from 'src/app/compartido/models/Nota';
import { User } from 'src/app/compartido/models/User';
import { NotasService } from 'src/app/services/notas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import {faStickyNote} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialogRecommendAcademyComponent } from '../dialog-recommend-academy/dialog-recommend-academy.component';
import { DialogRecommendEventComponent } from '../dialog-recommend-event/dialog-recommend-event.component';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {

  notas: Nota[];
  usuario: User;
  faStickyNote = faStickyNote

  constructor(
    private notasSvc: NotasService,
    private usuariosSvc: UsuariosService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.notasSvc.getNotasByIdUsuario(idusuario).subscribe(data => {
      this.notas = data
    })
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => {console.log(data), this.usuario = data})
  }

  openDialog(){
    this.dialog.open(DialogRecommendAcademyComponent, {width: '500px', height: '500px'});
  }

  recommendEvent(){
    this.dialog.open(DialogRecommendEventComponent, {width: '500px', height: '500px'});
  }

  editNote(idusuario:Number, idasignatura:Number){
    this.router.navigate(['/notas/edit/'+idusuario+'/'+idasignatura])
  }

  deleteNote(idusuario: Number, idasignatura:Number){
    this.notasSvc.deleteNota(idusuario,idasignatura).subscribe(res => {
      this.notas = this.notas.filter(nota => nota.idusuario.idusuario!==idusuario || nota.idasignatura.idasignatura!==idasignatura);
      Swal.fire("Nota borrada", 'Correctamente', 'success');
    })
  }
}
