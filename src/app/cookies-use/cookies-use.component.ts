import { Component, OnInit } from '@angular/core';
import { PagesService } from '../services/pages.service';
import { Meta, Title } from '@angular/platform-browser';
import{ SettingsConstants } from '../common/settings-constants';

@Component({
  selector: 'app-cookies-use',
  templateUrl: './cookies-use.component.html',
  styleUrls: ['./cookies-use.component.css']
})
export class CookiesUseComponent implements OnInit {
  SettingsConstant:any = SettingsConstants;

  public bannerImage: string = 'no-image.jpg';
  
  public page = {meta_title : "",meta_desc : "", banner_image : "", title : "", content_body : ""};
  constructor(private service:PagesService,private title: Title,private meta: Meta) { }

  ngOnInit() {
  	this.service.getCms('cms','cookies')
    .subscribe(response => {
      this.page = response;
      this.bannerImage = this.page.banner_image;
      this.title.setTitle(this.page.meta_title);
      this.meta.updateTag({ name: 'description', content: this.page.meta_desc });
    });
  }

  getBackgroundImageUrl(){
    return `url(https://www.cloostermanvaluefund.nl/uploads/cms/images/${this.bannerImage})`;
  }

}
