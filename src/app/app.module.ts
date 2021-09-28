import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatRadioModule} from '@angular/material/radio';
import { ChartsModule } from 'ng2-charts';

import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotasComponent } from './components/notas/notas.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AcademiasComponent } from './components/academias/academias.component';
import { UniversidadesCarrerasComponent } from './components/universidades-carreras/universidades-carreras.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { environment } from 'src/environments/environment';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guards/authguard';
import { UsuariosService } from './services/usuarios.service';
import { ProcesaHTTPMsjService } from './services/procesa-httpmsj.service';
import { baseURL } from './compartido/models/baseurl';
import { NotasService } from './services/notas.service';
import { AsignaturasService } from './services/asignaturas.service';
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { EditNotaComponent } from './components/edit-nota/edit-nota.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';
import { TestComponent } from './components/test/test.component';
import { EventosService } from './services/eventos.service';
import {MatSliderModule} from '@angular/material/slider';
import { DetalleEventoComponent } from './components/detalle-evento/detalle-evento.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { DetalleUniversidadComponent } from './components/detalle-universidad/detalle-universidad.component';
import { DetalleCarreraComponent } from './components/detalle-carrera/detalle-carrera.component';
import { DetalleAcademiaComponent } from './components/detalle-academia/detalle-academia.component';
import { CarrerasService } from './services/carreras.service';
import { AcademiasService } from './services/academias.service';
import { UniversidadesService } from './services/universidades.service';
import { DialogChangePasswordComponent } from './components/dialog-change-password/dialog-change-password.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { DialogRecommendAcademyComponent } from './components/dialog-recommend-academy/dialog-recommend-academy.component';
import { DialogRecommendEventComponent } from './components/dialog-recommend-event/dialog-recommend-event.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotasComponent,
    EventosComponent,
    AcademiasComponent,
    UniversidadesCarrerasComponent,
    NosotrosComponent,
    AsignaturasComponent,
    EditNotaComponent,
    EditUsuarioComponent,
    TestComponent,
    DetalleEventoComponent,
    FavoritosComponent,
    DetalleUniversidadComponent,
    DetalleCarreraComponent,
    DetalleAcademiaComponent,
    DialogChangePasswordComponent,
    TestResultComponent,
    DialogRecommendAcademyComponent,
    DialogRecommendEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatButtonModule,
    FontAwesomeModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    MatRadioModule,
    ChartsModule
  ],
  providers: [
    AngularFirestore,
    LoginService,
    UsuariosService,
    AuthGuard,
    ProcesaHTTPMsjService,
    NotasService,
    AsignaturasService,
    EventosService,
    CarrerasService,
    AcademiasService,
    UniversidadesService,
    {
      provide: 'baseURL', useValue:baseURL
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
