import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PagesService } from '../services/pages.service';
import { DocumentsService } from '../services/documents.service';
import{ SettingsConstants } from '../common/settings-constants';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  SettingsConstant:any = SettingsConstants;

  public bannerImage: string = 'no-image.jpg';
  
  public page = {banner_image : "", title : "", content_heading : "", content_sub_heading : "", meta_title : "Documents | Closternam",meta_desc : "Closternam",'content_body' : ""};
  public documents:any = {};
  constructor(private page_service:PagesService,private service:DocumentsService, private title: Title,private meta: Meta) { }

  ngOnInit() {
  	this.title.setTitle(this.page.meta_title);
    this.meta.updateTag({ name: 'description', content: this.page.meta_desc});

    this.service.getDocuments()
    .subscribe(response => {this.documents = response;});

    this.page_service.getCms('documenten')
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
