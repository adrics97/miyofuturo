import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotasService } from 'src/app/services/notas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { faCalendar, faInfo} from '@fortawesome/free-solid-svg-icons';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-dialog-recommend-event',
  templateUrl: './dialog-recommend-event.component.html',
  styleUrls: ['./dialog-recommend-event.component.scss']
})
export class DialogRecommendEventComponent implements OnInit {

  faInfo = faInfo
  faCalendar = faCalendar

  notasSobresalientes = []
  eventosRecomendados = []

  constructor(
    private notasSvc: NotasService,
    private eventosSvc: EventosService,
    public dialogRef: MatDialogRef<DialogRecommendEventComponent>,
  ) { }

  ngOnInit(): void {
    let idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.notasSvc.getNotasSobresalientes(idusuario).subscribe(data => this.notasSobresalientes = data)
  }

  searchEventosRecomendados(){
    this.eventosRecomendados = []
    this.eventosSvc.getEventosRecomendados().subscribe(data => {

      this.notasSobresalientes.map(nota => {
        let evento = data.filter(eve => eve.idasignatura.idasignatura == nota.idasignatura.idasignatura)[0]
        console.log(evento)
        if (evento){
          let eventoInsertado = this.eventosRecomendados.filter(eve => evento.idevento.idevento == eve.idevento.idevento)[0]
          if (!eventoInsertado)
            this.eventosRecomendados.push(evento)
        }
      })
   
    })
  }


  closeDialog(){
    this.dialogRef.close()
  }

}
