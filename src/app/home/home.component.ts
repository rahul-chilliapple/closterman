import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import{ SettingsConstants } from '../common/settings-constants';
import { PagesService } from '../services/pages.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public page = {meta_title : "Cloosterman",meta_desc : "Cloosterman", banner_image : "", title : "", content_body : "",body_image : "",extra_content_body : "",footer_image : ""};
  public blocks = {};
  SettingsConstant:any = SettingsConstants;
  public imageToShow: string;
  
  public bannerImage: string = 'no-image.jpg';
  public bodyImage: string = 'no-image.jpg';
  public footerImage: string = 'no-image.jpg';

  constructor(private page_service:PagesService,private title: Title,private meta: Meta,private sanitizer : DomSanitizer, public translate: TranslateService) { }


  ngOnInit() {
  	this.title.setTitle(this.page.meta_title);
      this.meta.updateTag({ name: 'description', content: this.page.meta_desc });

    this.page_service.getCms('cms','home')
    .subscribe(response => {
      this.page = response;
      
      this.bannerImage = this.page.banner_image;
      this.bodyImage = this.page.body_image;
      this.footerImage = this.page.footer_image;


      this.title.setTitle(this.page.meta_title);
      this.meta.updateTag({ name: 'description', content: this.page.meta_desc });
    });


    this.page_service.getHomeBlocks()
    .subscribe(response => {
      this.blocks = response;
    });
  }

  /*loadImage(path) {
    let nPath = path.split(".");
    
    nPath[0] = nPath[0].split('/').join('_')
    
    this.page_service.loginImg(nPath[0],nPath[1]).subscribe(result => {
      this.createImageFromBlob(result);
    });
  }


  createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
  }*/

}
