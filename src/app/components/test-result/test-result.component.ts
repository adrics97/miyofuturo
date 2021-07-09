
import { Component, OnInit } from '@angular/core';
import { AREASTEST } from 'src/app/compartido/models/AreasTest';
import { Respuesta } from 'src/app/compartido/models/Respuesta';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  areasResult = AREASTEST
  respuestas = []

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [], label: 'Test vocacional' }
  ];

  public chartLabels: String[] = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.respuestas = JSON.parse(localStorage.getItem('respuestas'));
    this.evaluateTest(this.respuestas)
  }

  evaluateTest( respuestas: Respuesta[]){
    console.log(respuestas)
    respuestas.map( res => {

    switch(res.id){
      case 1:
          if(res.respuesta == 1)
          this.areasResult.get("Artes y Humanidades").push(res.respuesta);
        else if(res.respuesta == 2)
          this.areasResult.get("Artes y Humanidades").push(res.respuesta);
        else if(res.respuesta == 3)
          this.areasResult.get("Ingeniería y Arquitectura").push(res.respuesta);
        break;
      case 2:
        if(res.respuesta == 1){
          this.areasResult.get("Ingeniería y Arquitectura").push(res.respuesta);
          this.areasResult.get("Ciencias").push(res.respuesta);
          this.areasResult.get("Ciencias de la salud").push(res.respuesta);
        }
        break;
      default:
        if(res.respuesta == 1)
          this.areasResult.get("Ingeniería y Arquitectura").push(res.respuesta);
        else if(res.respuesta == 2)
          this.areasResult.get("Ciencias Sociles y Júridicas").push(res.respuesta);
        else if(res.respuesta == 3)
          this.areasResult.get("Artes y Humanidades").push(res.respuesta);
        break;
          

    }
    
  })
    for (let [key, value] of this.areasResult) {
      this.chartLabels.push(key)
      this.chartDatasets[0].data.push(value.length)
    }
  }
  

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
