import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/compartido/models/User';
import { NotasService } from 'src/app/services/notas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuarios: User[];
  constructor(
    private usuariosSvc: UsuariosService,
    private notasSvc: NotasService
  ) { }

  ngOnInit(): void {
    let email = JSON.parse(localStorage.getItem('email'));
    this.usuariosSvc.getUsuarioByEmail(email).subscribe(data => {
      console.log("Usuario logueado: "+ data.idusuario)
      localStorage.setItem('idusuario', JSON.stringify(data.idusuario));
    })
    this.usuariosSvc.getUsuarios().subscribe(data => {this.usuarios = data})
  }

  deleteUser(id: Number){
    console.log(id)
    this.notasSvc.getNotasByIdUsuario(id).subscribe(data =>{
      console.log(data)
      if (data.length == 0){
        console.log("El usuario no tiene notas asociadas, se puede borrar")
        this.usuariosSvc.deleteUser(id).subscribe(data => {
          this.usuarios = this.usuarios.filter(p => p.idusuario!==id);
          Swal.fire("Usurio borrado", 'Correctamente', 'success');
        });
      } 
      else{
        console.log("El usuario tiene notas asociadas, NO se puede borrar")
        Swal.fire("El usuario tiene asociadas notas", 'Borrar primero las notas', 'error');
      } 
    })
   

  }

}
