import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../compartido/models/baseurl';
import { PreguntaTest } from '../compartido/models/PreguntasTest';
import { TestUsuario } from '../compartido/models/TestUsuario';
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
export class TestService {

  constructor(
    private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService
  ) { }

 
  getPreguntaByTest(idtest: Number):Observable<PreguntaTest []>{
    return this.http.get<PreguntaTest[]>(baseURL + "preguntastest?idtest=" + idtest)
  }

  createRespuesta(res: TestUsuario):Observable<TestUsuario>{
    return this.http.post<TestUsuario>(baseURL + "testusuario", res, httpOptions)
    .pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  getTestUsuarioByIdUsuario(idusuario: Number):Observable<TestUsuario []>{
    return this.http.get<TestUsuario[]>(baseURL + "testusuario/user?idusuario=" + idusuario)
  }

}
