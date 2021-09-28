import { AppPage } from './app.po';
import { LoginPage } from './login.po'
import { browser, by, logging } from 'protractor';
import { RegistroPage } from './registro.po';
import { EventoPage } from './eventos.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let loginPage: LoginPage;
  let registroPage: RegistroPage;
  let eventosPage: EventoPage;

  beforeEach(() => {
    page = new AppPage();
    loginPage = new LoginPage();
    registroPage = new RegistroPage();
    eventosPage = new EventoPage();
    loginPage.navigateTo('/login');
    registroPage.navigateTo('/login');
    
  });

  it('title of page', () => {
    page.navigateTo('/login');
    expect(page.getTitleText('app-login h1')).toEqual('Mi Yo Futuro');
  });

  it('inicio sesión', () => {
    loginPage.getEmailTextbox().sendKeys('adrics97@gmail.com');
    loginPage.getPasswordTextbox().sendKeys('123456');
    let form = loginPage.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('eventos', () => {
    loginPage.getEmailTextbox().sendKeys('adrics97@gmail.com');
    loginPage.getPasswordTextbox().sendKeys('123456');
    loginPage.getButtonEnviar().click()
    eventosPage.navigateTo('/eventos');
    eventosPage.getButtonInfo().click();
    expect(eventosPage.getEventoTitle()).toEqual('Evento: Olimpiadas matematicas')
  });

  xit('registro', () => {
    registroPage.getEmailTextbox().sendKeys('pepito@gmail.com');
    registroPage.getPasswordTextbox().sendKeys('123456');
    registroPage.getNombreTextbox().sendKeys('PEPE');
    registroPage.getApellidosTextbox().sendKeys('MARTOS PEREZ');
    registroPage.getTelefonoTextbox().sendKeys('66666666');
    registroPage.getCiudadTextbox().sendKeys('CS');
    registroPage.getDireccionTextbox().sendKeys('AVD VALENCIA');
    let option =  registroPage.getOptionCurso()
    registroPage.getCursoTextbox().sendKeys(String(option));
    registroPage.getInstitutoTextbox().sendKeys('IES');
    let form = registroPage.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
