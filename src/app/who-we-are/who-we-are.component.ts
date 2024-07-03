import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PagesService } from '../services/pages.service';
import{ SettingsConstants } from '../common/settings-constants';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit {
  SettingsConstant:any = SettingsConstants;

  public footerImage: string = 'no-image.jpg';
  public bannerImage: string = 'no-image.jpg';
  

  public page = {banner_image : "", title : "", content_heading : "", content_sub_heading : "", content_body : "", extra_content_body : "", meta_title : "Who we are | Closternam",meta_desc : "Closternam",footer_image : "",body_image : ""};
  constructor(private page_service:PagesService,private title: Title,private meta: Meta) { }

  ngOnInit() {
  	this.title.setTitle(this.page.meta_title);
    this.meta.updateTag({ name: 'description', content: this.page.meta_desc});

    this.page_service.getCms('wie-ben-ik')
    .subscribe(response => {
      this.page = response;

      this.bannerImage = this.page.banner_image;
      this.footerImage = this.page.footer_image;

      this.title.setTitle(this.page.meta_title);
      this.meta.updateTag({ name: 'description', content: this.page.meta_desc });
    });
  }

  getBackgroundImageUrl(){
    return `url(https://www.cloostermanvaluefund.nl/uploads/cms/images/${this.bannerImage})`;
  }

}
