import { Routes } from "@angular/router";
import { AcademiasComponent } from "./components/academias/academias.component";
import { AsignaturasComponent } from "./components/asignaturas/asignaturas.component";
import { EditNotaComponent } from "./components/edit-nota/edit-nota.component";
import { EditUsuarioComponent } from "./components/edit-usuario/edit-usuario.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { TestComponent } from "./components/test/test.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";
import { NotasComponent } from "./components/notas/notas.component";
import { UniversidadesCarrerasComponent } from "./components/universidades-carreras/universidades-carreras.component";
import { AuthGuard } from "./guards/authguard";
import { DetalleEventoComponent } from "./components/detalle-evento/detalle-evento.component";
import { FavoritosComponent } from "./components/favoritos/favoritos.component";
import { DetalleCarreraComponent } from "./components/detalle-carrera/detalle-carrera.component";
import { DetalleUniversidadComponent } from "./components/detalle-universidad/detalle-universidad.component";



export const rutas: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'test', component:TestComponent, canActivate: [AuthGuard]},
    {path: 'notas', component:NotasComponent,  canActivate: [AuthGuard]},
    {path: 'notas/edit/:idusuario/:idasignatura', component:EditNotaComponent,  canActivate: [AuthGuard]},
    {path: 'usuarios/edit/:idusuario', component:EditUsuarioComponent,  canActivate: [AuthGuard]},
    {path: 'asignaturas', component:AsignaturasComponent,  canActivate: [AuthGuard]},
    {path: 'eventos', component:EventosComponent,  canActivate: [AuthGuard]},
    {path: 'eventos/:idevento', component:DetalleEventoComponent,  canActivate: [AuthGuard]},
    {path: 'academias', component:AcademiasComponent,  canActivate: [AuthGuard]},
    {path: 'favoritos/:idusuario', component:FavoritosComponent,  canActivate: [AuthGuard]},
    {path: 'universidades', component:UniversidadesCarrerasComponent,  canActivate: [AuthGuard]},
    {path: 'universidades/:iduniversidad', component:DetalleUniversidadComponent,  canActivate: [AuthGuard]},
    {path: 'carreras/:idcarrera', component:DetalleCarreraComponent,  canActivate: [AuthGuard]},
    {path: 'nosotros', component:NosotrosComponent,  canActivate: [AuthGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];