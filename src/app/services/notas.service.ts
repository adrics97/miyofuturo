import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';
import { Asignatura } from '../compartido/models/Asignatura';
import { Observable } from 'rxjs';
import { baseURL } from '../compartido/models/baseurl';
import { catchError } from 'rxjs/operators';
import { Nota } from '../compartido/models/Nota';
import { EditNota } from '../compartido/models/EditNota';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }

  getNota(idusuario: Number, idasignatura: Number):Observable<Nota>{
    return this.http.get<Nota>(baseURL + "notas/nota?idusuario=" + idusuario+"&idasignatura="+idasignatura)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getNotasByIdUsuario(idusuario: Number):Observable<Nota []>{
    return this.http.get<Nota []>(baseURL + "notas/user?idusuario=" + idusuario)
  }

  
  createNota(nota: Nota):Observable<Nota>{
    return this.http.post<Nota>(baseURL + "notas", nota, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  updateNota(idusuario: Number, idasignatura:Number, nota:EditNota):Observable<Nota>{
    return this.http.put<Nota>(baseURL + "notas?idusuario=" + idusuario+ "&idasignatura="+ idasignatura, nota, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteNota(idusuario: Number, idasignatura:Number): Observable<void>{
    return this.http.delete<void>(baseURL + "notas?idusuario=" + idusuario+ "&idasignatura="+ idasignatura)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getNotasSuspendidasByUsuario(idusuario: Number):Observable<Nota []>{
    return this.http.get<Nota []>(baseURL + "notas/suspendidas?idusuario=" + idusuario)
  }

  getNotasSobresalientes(idusuario: Number):Observable<Nota []>{
    return this.http.get<Nota []>(baseURL + "notas/sobresalientes?idusuario=" + idusuario)
  }
}