import { Component, OnInit } from '@angular/core';
import{ SettingsConstants } from '../settings-constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  SettingsConstant:any = SettingsConstants;

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

}
