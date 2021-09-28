import { browser, by, element } from 'protractor';

export class EventoPage {
  navigateTo(link: string): Promise<unknown> {
    return browser.get(link) as Promise<unknown>;
  }

 
  getButtonInfo(){
      return element(by.xpath('/html/body/app-root/app-eventos/div/div/div[2]/mat-list/mat-list-item[3]/div/button/fa-icon/svg/path'));
  }
  
  getEventoTitle(){
      return element(by.xpath('/html/body/app-root/app-detalle-evento/div/mat-card/mat-card-header/div/mat-card-title'));
  }
}