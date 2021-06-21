import { Injectable } from '@angular/core';
import { baseURL } from '../compartido/models/baseurl';
import {  HttpClient } from '@angular/common/http';
import { User } from '../compartido/models/User';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }

  getUsuarios(): Observable<User []>{
    return this.http.get<User[]>(baseURL + "usuarios")
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getUsuario(idusuario: Number): Observable<User>{
    return this.http.get<User>(baseURL + "usuarios/" + idusuario)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
  
  getUsuarioByEmail(email: string): Observable<User>{
    return this.http.get<User>(baseURL + "usuarios/usuario?email="+ email)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
  createUsuario(user: User):Observable<User>{
    return this.http.post<User>(baseURL + "usuarios", user, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteUser(id:Number):Observable<void>{
    return this.http.delete<void>(baseURL + "usuarios/"+id)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  updateUser(idusuario: Number, usuario:User):Observable<User>{
    return this.http.put<User>(baseURL + "usuarios?idusuario=" + idusuario, usuario, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}

