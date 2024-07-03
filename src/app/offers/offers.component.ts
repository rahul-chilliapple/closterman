import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import{ SettingsConstants } from '../common/settings-constants';
import { PagesService } from '../services/pages.service';



@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  SettingsConstant:any = SettingsConstants;

  public bannerImage: string = 'no-image.jpg';
  public bodyImage: string = 'no-image.jpg';
  public footerImage: string = 'no-image.jpg';


  public page = {banner_image : "", title : "", content_heading : "", content_sub_heading : "",content_body : "",extra_content_body : "", meta_title : "Offers | Closternam",meta_desc : "Closternam",footer_image : ""};
  public blocks = {};
  constructor(private page_service:PagesService,private title: Title,private meta: Meta) { }

  ngOnInit() {
  	this.title.setTitle(this.page.meta_title);
    this.meta.updateTag({ name: 'description', content: this.page.meta_desc});

    this.page_service.getCms('wat-bied-ik')
    .subscribe(response => {
      this.page = response;


      this.bannerImage = this.page.banner_image;
      this.footerImage = this.page.footer_image;

      this.title.setTitle(this.page.meta_title);
      this.meta.updateTag({ name: 'description', content: this.page.meta_desc });
    });


    this.page_service.getOfferBlocks()
    .subscribe(response => {
      this.blocks = response;
    });
  }

  getBackgroundImageUrl(){
    return `url(https://www.cloostermanvaluefund.nl/uploads/cms/images/${this.bannerImage})`;
  }

  toTab(tab){
    tab = "tab-"+tab;    
    document.getElementsByClassName(tab)[0].scrollIntoView();
  }

}
