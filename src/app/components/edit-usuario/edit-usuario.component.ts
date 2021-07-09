import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/compartido/models/Curso';
import { User } from 'src/app/compartido/models/User';
import { faEnvelope, faPhone, faMapMarkedAlt, faMapSigns, faSchool, faIdCard} from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  erroresEditForm = {
    'email': '',
    'password': '',
    'nombre': '',
    'apellidos': '',
    'telefono': '',
    'ciudad': '',
    'direccion': '',
    'curso': '',
    'instituto':''
  };

  cursos: Curso[] = [
    {value: '3º ESO'},
    {value: '4º ESO'},
    {value: '1º BACH'},
    {value: '2º BACH'}
  ];

  editUserForm: FormGroup;
  editUser: User = new User()
  userUpdate: User
  faEnvelope = faEnvelope
  faPhone = faPhone
  faMapMarkedAlt = faMapMarkedAlt
  faMapSigns = faMapSigns
  faSchool = faSchool
  faIdCard = faIdCard
  

  constructor(
    private fb: FormBuilder,
    private usuariosSvc: UsuariosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let idusuario = Number(this.route.snapshot.paramMap.get('idusuario'));
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => {
      this.editUser = data;
      console.log(this.editUser)
    })

    this.initFormEditUserForm();
  }

  initFormEditUserForm(){
    this.editUserForm = this.fb.group({
      email: [this.editUser.email],
      password: [''],
      nombre: [this.editUser.nombre],
      apellidos: [this.editUser.apellidos],
      telefono: [this.editUser.telefono],
      ciudad: [this.editUser.ciudad],
      direccion: [this.editUser.direccion],
      curso: [this.editUser.curso],
      instituto: [this.editUser.instituto]

    })
    this.editUserForm.valueChanges.subscribe(datos => this.onCambioValorEditUser(datos));
  }

  updateUser(){
    this.userUpdate = this.editUserForm.value;
    this.usuariosSvc.updateUser(this.editUser.idusuario, this.userUpdate).subscribe(data => {
      console.log("ACTUALIZADO Correctamene")
      Swal.fire("Usuario actualizado correctamente", '', 'success')
    })
  }



  onCambioValorEditUser(data?: any) {
    if (!this.editUserForm) { return; }
    const form = this.editUserForm;
    for (const field in this.erroresEditForm) {
    // Se borrarán los mensajes de error previos
      this.erroresEditForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.erroresEditForm[field];
        for (const key in control.errors) {
            this.erroresEditForm[field] += messages[key] + ' ';
        }
      }
    }

  }

}

