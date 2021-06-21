import { Asignatura } from "./Asignatura";
import { User } from "./User";

export class Nota{
    idusuario: User;
    idasignatura: Asignatura;
    calificacion_1: Number = null;
    calificacion_2: Number = null;
    calificacion_3: Number = null;
}