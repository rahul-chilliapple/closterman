import { Component,OnInit } from '@angular/core';
import { SettingService } from './services/setting.service';
import { SettingsConstants } from './common/settings-constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'closterman-front';
  SettingsConstant:any = SettingsConstants;
  constructor(private service:SettingService, public translate: TranslateService) { 
    translate.addLangs(['en', 'nl']);
    //translate.setDefaultLang('nl');
  }
  
  onActivate(event) {
    window.scroll(0,0);    
  }
  
  ngOnInit() {
  	this.service.getSettings()
    .subscribe(response => {
    	for(var sett of response){
    		if(sett.slug == 'FOOTER_CONTACT')
    			this.SettingsConstant.footerContact = atob(sett.slug_value);
    		if(sett.slug == 'HEADER_CONTACT')
    			this.SettingsConstant.headerContact = atob(sett.slug_value);
        if(sett.slug == 'TESTIMONIAL')
          this.SettingsConstant.testimonialContact = atob(sett.slug_value);
    	}
    });
  }
}