import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../compartido/models/baseurl';
import { Carrera } from '../compartido/models/Carrera';
import { CarrerasUniversidad } from '../compartido/models/CarrerasUniversidad';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }



  getCarreras():Observable<Carrera[]>{
    return this.http.get<Carrera[]>(baseURL + "carreras")
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getCarrera(idcarrera:Number):Observable<Carrera>{
    return this.http.get<Carrera>(baseURL + "carreras/"+idcarrera)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getCarrerasByArea(area:string):Observable<Carrera[]>{
    return this.http.get<Carrera[]>(baseURL + "carreras/area?area="+area)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getCarrerasByUniversidad(iduniversidad: Number):Observable<CarrerasUniversidad[]>{
    return this.http.get<CarrerasUniversidad[]>(baseURL + "carreras/universidad?iduniversidad="+iduniversidad)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
