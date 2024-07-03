import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from '../services/testimonials.service';
import { PagesService } from '../services/pages.service';
import { Meta, Title } from '@angular/platform-browser';
import{ SettingsConstants } from '../common/settings-constants';

@Component({
  selector: 'app-for-whom',
  templateUrl: './for-whom.component.html',
  styleUrls: ['./for-whom.component.css']
})
export class ForWhomComponent implements OnInit {
  SettingsConstant:any = SettingsConstants;
  public testimonials : object;

  public bannerImage: string = 'no-image.jpg';
  
  public page = {banner_image : "", title : "", content_body : "", meta_title : "For Whom | Closternam",meta_desc : "Closternam"};

  constructor(private page_service:PagesService,private service:TestimonialsService,private title: Title,private meta: Meta) { }

  ngOnInit() {    

  	this.service.getTestimonials()
    .subscribe(response => {
      this.testimonials = response;
    });
    this.page_service.getCms('aan-wie')
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
