import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public allUrls = {};
  private cookieValue: string;
  public showCookiePopUp : boolean = false;
  public defaultLangCode : string = 'nl';
  public defaultLangName : string = 'English';
  public showAFM : boolean = false;
  public logo : string = 'logo.png';
  
  constructor(private page_service:PagesService,private cookie_service:CookieService, public translate: TranslateService, public location: Location) { 
    let lang =  this.cookie_service.get('lang_code') != '' ? this.cookie_service.get('lang_code') : 'nl';
    translate.setDefaultLang(lang);
    if(this.cookie_service.get('lang_code') == 'en')
    {
      this.defaultLangName = 'Nederlands';
      this.logo = 'logo-en.png';
    }
  }

  ngOnInit() {
     if(this.location.path() == '')
      this.showAFM = true;
  	 //Cookie
  	 if(this.cookie_service.get('accepted-cookie') == 'accepted'){
  	 	this.showCookiePopUp = false;
  	 }
  	 else{
  	 	this.showCookiePopUp = true;
  	 }
  	 //lang code
     if(this.cookie_service.get('lang_code') == ''){
      this.defaultLangCode = 'nl';
     }
     else{
      this.defaultLangCode = this.cookie_service.get('lang_code');
     }
     //Cookie end

  	 this.page_service.gerAllUrls()
    .subscribe(response => {this.allUrls = response;});
  }

  acceptCookie(){
  	this.cookie_service.set('accepted-cookie','accepted',7800000);
  	this.showCookiePopUp = false;
  }

  mobileHeaderClick(){
    let element = document.getElementById('menu-btn-icon');
    this.showAFM = false;
    
    element.click();
  }

  switchLang(language){
    this.cookie_service.set('lang_code',language,7800000);
    this.translate.use(language);
    window.location.reload();
  }

  changeAFM(home){
    this.showAFM = home;
  }

}
