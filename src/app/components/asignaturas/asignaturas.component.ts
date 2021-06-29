import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asignatura } from 'src/app/compartido/models/Asignatura';
import { Nota } from 'src/app/compartido/models/Nota';
import { User } from 'src/app/compartido/models/User';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { NotasService } from 'src/app/services/notas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {faVial} from '@fortawesome/free-solid-svg-icons';
import { ASIGNATURAS } from 'src/app/compartido/models/Asignaturas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent implements OnInit {

  erroresAsignaturaForm = {
    'nombre': '',
  }
  mensajesError = {
    'nombre': {
      'required': 'El nombre de la asignatura es obligatoria'
    }
  }

  asignaturas: Asignatura[] = []
  ramasAsignaturas = ASIGNATURAS;
  allAsignaturas: String[];
  usuario: User;
  selectedRama = ''
  asignaturaForm: FormGroup
  newNota: Nota = new Nota();
  fk_asignatura: Asignatura;
  faVial = faVial

  constructor(
    private notasSvc: NotasService,
    private asignaturasSvc: AsignaturasService,
    private usuariosSvc: UsuariosService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void { 
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => {console.log(data), this.usuario = data})
    
    this.notasSvc.getNotasByIdUsuario(idusuario).subscribe(data => {
      console.log(data)
      data.map(nota => {
        console.log(nota.idasignatura)
        this.asignaturas.push(nota.idasignatura)
      })
    })
    this.initFormAsignatura();

  }

  getKeys(map: Map<String, String[]>){
    return Array.from(map.keys());
  }

  chooseRama(rama:string){ 
    this.allAsignaturas = ASIGNATURAS.get(rama)
  }

  private initFormAsignatura():void{
    this.asignaturaForm = this.fb.group({
      nombre: ['', [Validators.required]]
    })
    this.asignaturaForm.valueChanges.subscribe(datos => this.onCambioValorAsignatura(datos));
    this.onCambioValorAsignatura();
  }

  addAsignatura(){
    const asig = this.asignaturaForm.value;
    let idusuario = JSON.parse(localStorage.getItem('idusuario'))
    console.log(idusuario);
    this.asignaturasSvc.getAsignaturaByNombre(asig.nombre).subscribe(data => {
      if (data == null){
        this.asignaturasSvc.createAsignatura(asig).subscribe(res => {
          console.log("Asignatura creada:" + res.idasignatura)
          //this.asignaturas.push(res); //PUSH ASignatura con POST
          this.fk_asignatura = res;
          this.saveNota(idusuario, res.idasignatura);
        })
      }
      else{
        this.fk_asignatura=data;
        console.log("ID asig: "+data.idasignatura)
        this.saveNota(idusuario, data.idasignatura);
      }
      this.asignaturaForm.reset({nombre: ''})
    });
  }

  deleteAsignatura(idasignatura: Number){
    this.notasSvc.deleteNota(this.usuario.idusuario, idasignatura).subscribe(data => {
      this.asignaturas = this.asignaturas.filter( asig => asig.idasignatura !== idasignatura)
    })
  }
  
  saveNota(idusuario: Number, idasignatura:Number){
    this.newNota.idusuario=this.usuario;
    this.newNota.idasignatura=this.fk_asignatura;
    this.notasSvc.getNota(idusuario, idasignatura).subscribe(data => {
      console.log("Nota: "+ data)
      if(data == null){
        this.notasSvc.createNota(this.newNota).subscribe(res => {
          console.log("Nota creada: "+{res})
          this.asignaturas.push(res.idasignatura);
        })
      }
      else{
        Swal.fire("Asignatura ya añadida", " ","warning")
      }
    });
  }


  onCambioValorAsignatura(data?: any) {
    if (!this.asignaturaForm) { return; }
    const form = this.asignaturaForm;
    for (const field in this.erroresAsignaturaForm) {
    // Se borrarán los mensajes de error previos
      this.erroresAsignaturaForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
            this.erroresAsignaturaForm[field] += messages[key] + ' ';
        }
      }
    }
  }
}
