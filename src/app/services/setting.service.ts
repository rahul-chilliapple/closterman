import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contstants } from '../contstants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private urlPath = contstants.apiurl+'settings';
  public defaultLangCode : string = 'nl';

  constructor(private httpClient: HttpClient,private cookie_service:CookieService) {
  	if(this.cookie_service.get('lang_code') != ''){
      this.defaultLangCode = this.cookie_service.get('lang_code');
    }
  }

  getSettings():any{
    return this.httpClient.get(this.urlPath+'/'+this.defaultLangCode);
  }
}
