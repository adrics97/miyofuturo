import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../compartido/models/baseurl';
import { Evento } from '../compartido/models/Evento';
import { EventoFavorito } from '../compartido/models/EventoFavorito';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }


  getEventos():Observable<Evento[]>{
    return this.http.get<Evento[]>(baseURL + "eventos")
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getEvento(idevento: Number):Observable<Evento>{
    return this.http.get<Evento>(baseURL + "eventos/"+idevento)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getEventoFavorito(idevento: Number, idusuario:Number):Observable<EventoFavorito>{
    return this.http.get<EventoFavorito>(baseURL + "eventos/favoritos/evento?idevento="+idevento+"&idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getFavoritosByUsuario(idusuario: Number):Observable<Evento[]>{
    return this.http.get<Evento[]>(baseURL + "eventos/favoritos?idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addFavorito(eventoFavorito: EventoFavorito):Observable<EventoFavorito>{
    return this.http.post<EventoFavorito>(baseURL + "eventos/favoritos", eventoFavorito, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteFavorito(idevento: Number, idusuario:Number):Observable<void>{
    return this.http.delete<void>(baseURL + "eventos/favoritos?idevento="+idevento+"&idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  updateFavorito(idevento: Number, idusuario:Number, eventoFavorito: EventoFavorito):Observable<EventoFavorito>{
    return this.http.put<EventoFavorito>
    (baseURL + "eventos/favoritos?idevento="+idevento+"&idusuario="+idusuario, eventoFavorito, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getEventosByCity(ciudad: string):Observable<Evento []>{
    return this.http.get<Evento []>(baseURL + "eventos/ciudad?ciudad="+ciudad)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
