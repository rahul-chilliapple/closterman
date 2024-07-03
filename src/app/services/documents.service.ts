import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contstants } from '../contstants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private urlPath = contstants.apiurl+'documents';
  public defaultLangCode : string = 'nl';

  constructor(private httpClient: HttpClient,private cookie_service:CookieService) {
  	if(this.cookie_service.get('lang_code') != ''){
      this.defaultLangCode = this.cookie_service.get('lang_code');
    }
  }
  getDocuments():any{
    return this.httpClient.get(this.urlPath+'/'+this.defaultLangCode);
  }
}
