import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faEnvelope, faPhone, faMapMarkedAlt, faMapSigns, faSchool, faIdCard, faKey} from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/compartido/models/User';
import { Curso } from 'src/app/compartido/models/Curso';
import { MatDialog, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  erroresLoginForm = {
    'email': '',
    'password': ''
  }
  erroresRegisterForm = {
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

  mensajesError = {
    'email': {
      'required': 'El email es obligatorio',
      'email': 'El email no tiene el formato correcto.'
    },
    'password': {
      'required': 'La contraseña es obligatoria'
    },
    'nombre': {
      'required': 'El nombre es obligatorio'
    },
    'apellidos': {
      'required': 'Los apellidos son obligatorios'
    },
    'telefono': {
      'required': 'El telefono es obligatorio',
      'pattern':  'El número de teléfono sólo puede contener números'
    },
    'ciudad': {
      'required': 'La ciudad es obligatoria'
    },
    'direccion': {
      'required': 'La direccion es obligatoria'
    },
    'curso': {
      'required': 'El curso es obligatorio'
    },
    'instituto': {
      'required': 'El instituto es obligatorio'
    }
  }
  loginForm: FormGroup;
  registerForm: FormGroup;
  newUser: User;
  selectedCurso: string;
  isSignedIn = false;
  faEnvelope = faEnvelope
  faPhone = faPhone
  faMapMarkedAlt = faMapMarkedAlt
  faMapSigns = faMapSigns
  faSchool = faSchool
  faIdCard = faIdCard
  faKey = faKey
  

  cursos: Curso[] = [
    {value: '3º ESO'},
    {value: '4º ESO'},
    {value: '1º BACH'},
    {value: '2º BACH'}
  ];

  constructor(
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private usuariosSvc: UsuariosService,
    private router: Router,
    public dialog: MatDialog) { }

 

  ngOnInit(): void {
    this.initFormLogin();
    this.initFormRegister();
  }

  async onLogin(): Promise<void>{
    if (this.loginForm.valid){
      try{
        console.log(this.loginForm.value);
        const formLogin = this.loginForm.value;
        await this.loginSvc.onSignIn(formLogin.email, formLogin.password);
        Swal.fire("Logueado correctamente", 'Bienvenido!', 'success')
        this.isSignedIn = true;
        this.router.navigate(['/home'])
      }catch(e){
        Swal.fire("Oops.....", "El email o la contraseña no son correctas", 'error')
      }
    }
    else{
      Swal.fire("Oops.....", "Comprueba los datos del formulario", 'error')
    }
  }


  async onRegister(): Promise<void>{
    if (this.registerForm.valid){
      try{
        const formRegister = this.registerForm.value;
        await this.loginSvc.onSignUp(formRegister.email, formRegister.password);
        this.newUser = this.registerForm.value;
        console.log(this.newUser)
        this.usuariosSvc.createUsuario(this.newUser).subscribe(data => {
          console.log({data})
          console.log("Usuario creado: "+data.idusuario)
          localStorage.setItem('idusuario', JSON.stringify(data.idusuario));
          localStorage.setItem('usuario', JSON.stringify(data));
          Swal.fire("Registrado completado", 'Inicia sesión para acceder!', 'success')
          this.registerForm.reset({
            email: ' ',
            password: ' ',
            nombre: ' ',
            apellidos: ' ',
            telefono: 0,
            ciudad: ' ',
            direccion: ' ',
            curso: ' ',
            instituto: ' '
          })
          this.router.navigate(['/login'])
       
        })
        
       

        
      }catch(e){
        Swal.fire("Oops.....", "Error al crear el nuevo usuario", 'error')
      }
    }
    else{
      Swal.fire("Oops.....", "Comprueba los datos del formulario", 'error')
    }
  }

  isValidField(field: string, form:FormGroup):string{
    const validatedField = form.get(field);
    return (!validatedField.valid && validatedField.touched)
     ? 'is-invalid': validatedField.touched ? 'is-valid': '';
  }

  private initFormLogin():void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    this.loginForm.valueChanges.subscribe(datos => this.onCambioValorLogin(datos));
    this.onCambioValorLogin();
  }

  private initFormRegister():void{
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: [0, [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      instituto: ['', [Validators.required]]

    })
    this.registerForm.valueChanges.subscribe(datos => this.onCambioValorRegister(datos));
    this.onCambioValorRegister();
   
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {width: '500px', height: '300px'});

  }

  onCambioValorLogin(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.erroresLoginForm) {
    // Se borrarán los mensajes de error previos
      this.erroresLoginForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
            this.erroresLoginForm[field] += messages[key] + ' ';
        }
      }
    }
  }


  onCambioValorRegister(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;
    for (const field in this.erroresRegisterForm) {
    // Se borrarán los mensajes de error previos
      this.erroresRegisterForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
            this.erroresRegisterForm[field] += messages[key] + ' ';
        }
      }
    }
  }
}

