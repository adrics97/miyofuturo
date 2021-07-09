import { Pregunta } from "./Pregunta"
import { Test } from "./Test"
import { TestBD } from "./TestBD"
import { User } from "./User"

export class TestUsuario{
    idtest: TestBD
    idpregunta: Pregunta
    idusuario: User
    respuesta: Number
}