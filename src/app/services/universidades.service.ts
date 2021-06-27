import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../compartido/models/baseurl';
import { CarrerasUniversidad } from '../compartido/models/CarrerasUniversidad';
import { Universidad } from '../compartido/models/Universidad';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

@Injectable({
  providedIn: 'root'
})
export class UniversidadesService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }


  getUniversidades():Observable<Universidad[]>{
    return this.http.get<Universidad[]>(baseURL + "universidades")
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getUniversidadesByComunidad(comunidad:string):Observable<Universidad[]>{
    return this.http.get<Universidad[]>(baseURL + "universidades/comunidad?comunidad="+comunidad)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getUniversidadesByProvincia(provincia:string):Observable<Universidad[]>{
    return this.http.get<Universidad[]>(baseURL + "universidades/provincia?provincia="+provincia)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getUniversidadesByCarrera(idcarrera: Number):Observable<CarrerasUniversidad[]>{
    return this.http.get<CarrerasUniversidad[]>(baseURL + "universidades/carrera?idcarrera="+idcarrera)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getUniversidad(iduniversidad: Number):Observable<Universidad>{
    return this.http.get<Universidad>(baseURL + "universidades/"+iduniversidad)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
