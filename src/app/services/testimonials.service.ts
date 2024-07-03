import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contstants } from '../contstants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  
  private url = contstants.apiurl+'get-testimonials';
  public defaultLangCode : string = 'nl';

  constructor(private httpClient: HttpClient,private cookie_service:CookieService) {
  	if(this.cookie_service.get('lang_code') != ''){
      this.defaultLangCode = this.cookie_service.get('lang_code');
    }
  }

  getTestimonials(){
    return this.httpClient.get(this.url+'/'+this.defaultLangCode);
  }
}
