import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nota } from 'src/app/compartido/models/Nota';
import { User } from 'src/app/compartido/models/User';
import { NotasService } from 'src/app/services/notas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {

  notas: Nota[];
  usuario: User;

  constructor(
    private notasSvc: NotasService,
    private usuariosSvc: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.notasSvc.getNotasByIdUsuario(idusuario).subscribe(data => { console.log(data), this.notas = data})
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => {console.log(data), this.usuario = data})
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
