import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asignatura } from '../compartido/models/Asignatura';
import { baseURL } from '../compartido/models/baseurl';
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
export class AsignaturasService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }

  getAsignatura(idasignatura:Number):Observable<Asignatura>{
    return this.http.get<Asignatura>(baseURL + "asignaturas/" + idasignatura)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getAsignaturaByNombre(nombre:string):Observable<Asignatura>{
    return this.http.get<Asignatura>(baseURL + "asignaturas/asignatura?nombre=" + nombre)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  createAsignatura(asig: Asignatura):Observable<Asignatura>{
    return this.http.post<Asignatura>(baseURL + "asignaturas", asig, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

}
