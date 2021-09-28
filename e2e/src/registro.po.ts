import { browser, by, element } from 'protractor';

export class RegistroPage {
  navigateTo(link: string): Promise<unknown> {
    return browser.get(link) as Promise<unknown>;
  }

  getEmailTextbox() {
    return element(by.name('email-registro'));
   }
   getPasswordTextbox() {
    return element(by.name('password-registro'));
   }

   getNombreTextbox() {
    return element(by.name('nombre'));
   }
   getApellidosTextbox() {
    return element(by.name('password'));
   }
   getTelefonoTextbox() {
    return element(by.name('telefono'));
   }
   getCiudadTextbox() {
    return element(by.name('ciudad'));
   }
   getDireccionTextbox() {
    return element(by.name('direccion'));
   }
   getCursoTextbox() {
    return element(by.name('curso'));
   }

   getOptionCurso(){
       return element(by.css('select option:nth-child(1)')).click();
   }

   getInstitutoTextbox() {
    return element(by.name('instituto'));
   }

   getForm(){
       return element(by.name('registroForm'));
   }
}