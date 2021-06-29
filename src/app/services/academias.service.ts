import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Academia } from '../compartido/models/Academia';
import { AcademiaFavorita } from '../compartido/models/AcademiaFavorita';
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
export class AcademiasService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }

  getAcademias():Observable<Academia[]>{
    return this.http.get<Academia[]>(baseURL + "academias")
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
  
  getAcademia(idacademia: Number):Observable<Academia>{
    return this.http.get<Academia>(baseURL + "academias/"+idacademia)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getAcademiasByCiudad(ciudad: string):Observable<Academia []>{
    return this.http.get<Academia[]>(baseURL + "academias/ciudad?ciudad="+ciudad)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getAcademiasFavoritasByUsuario(idusuario:Number):Observable<AcademiaFavorita[]>{
    return this.http.get<AcademiaFavorita[]>(baseURL + "academias/favoritas/user?idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getAcademiaFavorita(idacademia: Number, idusuario: Number):Observable<AcademiaFavorita>{
    return this.http.get<AcademiaFavorita>(baseURL + "academias/favoritas/academia?idacademia="+idacademia+"&idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addFavorita(academiaFav: AcademiaFavorita):Observable<AcademiaFavorita>{
    return this.http.post<AcademiaFavorita>(baseURL + "academias/favoritas", academiaFav, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteFavorita(idacademia:Number, idusuario:Number):Observable<void>{
    return this.http.delete<void>(baseURL + "academias/favoritas?idacademia="+idacademia+"&idusuario="+idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
