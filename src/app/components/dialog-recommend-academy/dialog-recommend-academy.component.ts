import { Component, OnInit } from '@angular/core';
import { AcademiasService } from 'src/app/services/academias.service';
import { NotasService } from 'src/app/services/notas.service';
import {faSchool, faSearch, faInfo} from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/compartido/models/User';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dialog-recommend-academy',
  templateUrl: './dialog-recommend-academy.component.html',
  styleUrls: ['./dialog-recommend-academy.component.scss']
})
export class DialogRecommendAcademyComponent implements OnInit {

  notasSuspendidas = []
  academiasByCiudad = []
  usuario: User

  faSchool = faSchool;
  faInfo = faInfo;
  
  constructor(
    private notasSvc: NotasService,
    private academiasSvc: AcademiasService,
    private usuariosSvc: UsuariosService,
    public dialogRef: MatDialogRef<DialogRecommendAcademyComponent>,
  ) { }

  ngOnInit(): void {
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => this.usuario = data)
    this.notasSvc.getNotasSuspendidasByUsuario(idusuario).subscribe(data => this.notasSuspendidas = data)

  }

  searchAcademias(){
    this.academiasSvc.getAcademiasByCiudad(this.usuario.ciudad).subscribe(data => this.academiasByCiudad = data)
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
