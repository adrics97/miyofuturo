import { NumberInput } from '@angular/cdk/coercion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../compartido/models/baseurl';
import { Carrera } from '../compartido/models/Carrera';
import { CarreraFavorita } from '../compartido/models/CarreraFavorita';
import { CarrerasUniversidad } from '../compartido/models/CarrerasUniversidad';
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

  getCarrerasFavoritasByUsuario(idusuario:Number):Observable<CarreraFavorita[]>{
    return this.http.get<CarreraFavorita[]>(baseURL + "carreras/favoritas/user?idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addFavorita(carreraFav: CarreraFavorita):Observable<CarreraFavorita>{
    return this.http.post<CarreraFavorita>(baseURL + "carreras/favoritas", carreraFav, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getCarreraFavorita(idcarrera:Number, idusuario:Number):Observable<CarreraFavorita>{
    return this.http.get<CarreraFavorita>(baseURL + "carreras/favoritas/carrera?idcarrera="+idcarrera+"&idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteFavorito(idcarrera:Number, idusuario:Number):Observable<void>{
    return this.http.delete<void>(baseURL + "carreras/favoritas?idcarrera="+idcarrera+"&idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
