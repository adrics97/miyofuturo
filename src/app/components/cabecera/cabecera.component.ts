import { Component, OnInit } from '@angular/core';
import { faUser, faHome, faStickyNote, faSchool, faInfo,
   faGraduationCap, faCalendar, faSignInAlt, faStar, faIdCard, faVial, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { Asignatura } from 'src/app/compartido/models/Asignatura';
import { LoginService } from 'src/app/services/login.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  faUser = faUser;
  faHome = faHome;
  faStickyNote = faStickyNote;
  faSchool = faSchool;
  faInfo = faInfo;
  faGraduationCap = faGraduationCap;
  faCalendar = faCalendar;
  faSignInAlt = faSignInAlt;
  faStar = faStar;
  faIdCard = faIdCard;
  faVial = faVial;
  faFileAlt = faFileAlt;
  testExist = false;
  asignaturas: Asignatura[] = []
  cuenta = '';
  idusuario: Number

  constructor(
    private loginSvc: LoginService,
    private notasSvc: NotasService
  ) { }

  ngOnInit(): void {
    this.getEmailLocalStorage();
    this.idusuario = JSON.parse(localStorage.getItem('idusuario'));
    this.notasSvc.getNotasByIdUsuario(this.idusuario).subscribe(data => {
      console.log(data)
      data.map(nota => {
        console.log(nota.idasignatura)
        this.asignaturas.push(nota.idasignatura)
      })
    })
  }

  getEmailLocalStorage():Observable<string>{ 
    let email = JSON.parse(localStorage.getItem('email'));
    console.log(email)
    if(email)
      this.cuenta=email;
    else
      email;
    return of(this.cuenta);
  }

  logOut(){
    this.loginSvc.logOut();
    let usuario = JSON.parse(localStorage.getItem('user'));
    console.log(usuario);
  }
}
