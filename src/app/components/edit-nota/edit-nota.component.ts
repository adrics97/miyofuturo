import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Asignatura } from 'src/app/compartido/models/Asignatura';
import { EditNota } from 'src/app/compartido/models/EditNota';
import { Nota } from 'src/app/compartido/models/Nota';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { NotasService } from 'src/app/services/notas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.component.html',
  styleUrls: ['./edit-nota.component.scss']
})
export class EditNotaComponent implements OnInit {

  erroresEditForm = {
    'califiacion_1': '',
    'califiacion_2': '',
    'califiacion_3': ''
  }

  mensajesError = {
    'califiacion_1': {
      'number': 'La califiación debe ser un número'
    }
  }

  editNota: Nota = new Nota()
  notaUpdate: EditNota
  editForm: FormGroup
  asignatura: Asignatura

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasSvc: NotasService,
    private asignaturasSvc : AsignaturasService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    let idusuario = Number(this.route.snapshot.paramMap.get('idusuario'));
    let idasignatura = Number(this.route.snapshot.paramMap.get('idasignatura'));
    this.notasSvc.getNota(idusuario,idasignatura).subscribe(data => {
      this.editNota = data
    })
    this.asignaturasSvc.getAsignatura(idasignatura).subscribe(data => this.asignatura = data)

    
    this.editForm = this.fb.group({
      calificacion_1: [this.editNota.calificacion_1],
      calificacion_2: [this.editNota.calificacion_2],
      calificacion_3: [this.editNota.calificacion_3]
    })
    this.editForm.valueChanges.subscribe(datos => this.onCambioValorEdit(datos));
  
  }

  updateNota(){
    this.notaUpdate = this.editForm.value;
    console.log(this.notaUpdate)
    console.log(this.editNota.idusuario.idusuario)
    this.notasSvc.updateNota(this.editNota.idusuario.idusuario, this.editNota.idasignatura.idasignatura, this.notaUpdate)
      .subscribe( data => {
        Swal.fire("Nota actualizada correctamente", '', 'success')
        this.router.navigate(['/notas'])
      })
  }

  onCambioValorEdit(data?: any) {
    if (!this.editForm) { return; }
    const form = this.editForm;
    for (const field in this.erroresEditForm) {
    // Se borrarán los mensajes de error previos
      this.erroresEditForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
            this.erroresEditForm[field] += messages[key] + ' ';
        }
      }
    }

  }

}
