import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contstants } from '../contstants';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private urlPath = contstants.apiurl+'cms-page/';
  private allurlPath = contstants.apiurl+'get-all-urls';
  public defaultLangCode : string = 'nl';

  constructor(private httpClient: HttpClient,private cookie_service:CookieService) {
    if(this.cookie_service.get('lang_code') != ''){
      this.defaultLangCode = this.cookie_service.get('lang_code');
    }
  }

  getCms(template,slug = ''):any{
    if(slug != '')
    	return this.httpClient.get(this.urlPath+template+'/'+this.defaultLangCode+'/'+slug);
	  else
		  return this.httpClient.get(this.urlPath+template+'/'+this.defaultLangCode);
  }

  gerAllUrls():any{
  	return this.httpClient.get(this.allurlPath+'/'+this.defaultLangCode);
  }

  getHomeBlocks():any{
    return this.httpClient.get(contstants.apiurl+'get-home-blocks'+'/'+this.defaultLangCode);
  }

  getOfferBlocks():any{
    return this.httpClient.get(contstants.apiurl+'get-offer-blocks'+'/'+this.defaultLangCode);
  }


  loginImg(path = '',ext = ''): Observable<Blob>{
    const url = contstants.apiurl+'get-image/'+path+'/'+ext;
    return this.httpClient.get(url, { responseType: 'blob' });
  }


  loadImg(path = '',ext = ''): Observable<Blob>{
    const url = 'https://www.cloostermanvaluefund.nl/uploads/cms/images/351580889204.png';
    return this.httpClient.get(url, { responseType: 'blob' });
  }

}
