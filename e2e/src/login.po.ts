import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo(link: string): Promise<unknown> {
    return browser.get(link) as Promise<unknown>;
  }

  getEmailTextbox() {
    return element(by.xpath('//*[@id="mat-input-0"]'));
   }
   getPasswordTextbox() {
    return element(by.name('password'));
   }

   getButtonEnviar(){
       return element(by.xpath('/html/body/app-root/app-login/div[2]/div[1]/div/div[2]/form/div[3]/button'));
   }
   getForm(){
       return element(by.name('loginForm'));
   }
}