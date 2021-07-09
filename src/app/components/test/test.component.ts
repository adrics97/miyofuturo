import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PREGUNTAS } from 'src/app/compartido/models/PREGUNTAS';
import { Test } from 'src/app/compartido/models/Test';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { TestUsuario } from 'src/app/compartido/models/TestUsuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/compartido/models/User';
import { TestBD } from 'src/app/compartido/models/TestBD';
import { Pregunta } from 'src/app/compartido/models/Pregunta';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

//   erroresTestForm = {
//     'respuesta': ''
//   }

//  mensajesError:{
//    'respuesta': {
//       'required': 'Debes seleccionar una opción'
//     }
//   }

  testForm: FormGroup;
  test: Test = new Test()
  preguntas: Pregunta[] = []
  respuestas: {id: Number, respuesta: Number}[] = []
  usuario: User
  testBD: TestBD

  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private testSvc: TestService,
    private usuariosSvc: UsuariosService
  ) { }


  ngOnInit(): void {
    this.initFormTest();
    this.test.preguntas = []

    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.usuariosSvc.getUsuario(idusuario).subscribe(data => this.usuario = data)
   
    this.testSvc.getPreguntaByTest(1).subscribe(data => {
      this.testBD = data[0].idtest
      data.map(pretest => {
        this.preguntas.push(pretest.idpregunta)
        this.test.preguntas.push(pretest.idpregunta)
      })
    })
    console.log(this.preguntas)

  }

  private initFormTest():void{
    this.testForm = this.fb.group({
      respuesta: new FormControl([0, [Validators.required]])
    })
    //this.testForm.valueChanges.subscribe(datos => this.onCambioValorTest(datos));
  }

  radioChange(id: Number, event: MatRadioChange){
  
    if (this.respuestas.length == 0){
      this.respuestas.push({id:id , respuesta:event.value})
    }
    else{
      let respuesta = this.respuestas.filter(res => res.id == id)
      this.respuestas.filter(res => {
        if(res.id ==id){
          res.respuesta = event.value
        } 
      })
      if (respuesta.length == 0){
        this.respuestas.push({id:id , respuesta:event.value})
      }

    }
    

  }

  saveTest(){
    if (this.respuestas.length == 20){
      this.test.respuestas = this.respuestas
      console.log(this.test.respuestas)
     
     
      this.testSvc.getPreguntaByTest(this.testBD.idtest).subscribe(data => {
        data.map(pre => {
          let newRespuesta = new TestUsuario()
          newRespuesta.idpregunta=pre.idpregunta
          newRespuesta.idusuario=this.usuario
          newRespuesta.idtest = this.testBD
          newRespuesta.respuesta = this.respuestas.filter(res => res.id == pre.idpregunta.idpregunta)[0].respuesta
          this.testSvc.createRespuesta(newRespuesta).subscribe(data => console.log(data))
        })
      })
        
      this.testForm.reset({respuesta: null})
      localStorage.setItem('respuestas', JSON.stringify(this.test.respuestas))
      Swal.fire("Test realizado con exito", '', 'success')
      this.router.navigate(['/test-result'])
    }
    else{
      Swal.fire("Comprueba los datos del formulario", '', 'error')
    }
  }




/*
  onCambioValorTest(data?: any) {
    console.log("ENTRO AQUI")
    if (!this.testForm) { return; }
    const form = this.testForm;
    for (const field in this.erroresTestForm) {
    // Se borrarán los mensajes de error previos
      this.erroresTestForm[field] = '';
      const control = form.get(field);
      console.log(control)
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesError[field];
        for (const key in control.errors) {
            this.erroresTestForm[field] += messages[key] + ' ';
            console.log( this.erroresTestForm[field])
        }
      }
    }
  }
  */
}
