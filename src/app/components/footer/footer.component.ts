import { Component, OnInit } from '@angular/core';
import {faInstagram, faFacebook, faTwitter, faGoogle, faYoutube, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faPhone,faFax, faEnvelope} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faYoutube = faYoutube;
  faLinkedin = faLinkedin;
  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
