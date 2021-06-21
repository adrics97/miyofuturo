import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  testForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initFormTest();
  }

  private initFormTest():void{
    this.testForm = this.fb.group({
      pregunta: ['', [Validators.required]],
      respuesta: ['', [Validators.required]]
    })
    //this.testForm.valueChanges.subscribe(datos => this.onCambioValorTest(datos));
    //this.onCambioValorTest();
  }


  saveTest(){

  }
  
}
