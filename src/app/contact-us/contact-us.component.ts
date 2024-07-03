import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { contstants } from '../contstants';
import{ SettingsConstants } from '../common/settings-constants';
import { PagesService } from '../services/pages.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [DatePipe]
})

export class ContactUsComponent implements OnInit {
  SettingsConstant:any = SettingsConstants;
  contactForm: FormGroup;
  paymentForm: FormGroup;
  showSuccessMsg: boolean = false;
  showFailureMsg: boolean = false;
  showPSuccessMsg: boolean = false;
  showPFailureMsg: boolean = false;
  submitted:boolean = false;
  paymentSubmitted:boolean = false;
  paymentFormShow:boolean = false;
  contactFormShow:boolean = true;
  serverError:any = '';
  fileToUpload: File = null;
  public defaultLangCode : string = 'nl';

  public bannerImage: string = 'no-image.jpg';

  private simpleContactPath = contstants.apiurl+'simple-form';  
  private paymentContactPath = contstants.apiurl+'payment-form';  
  public page = {banner_image : "",title : "", content_heading : "",content_sub_heading : "", content_body : "", meta_title : "Contact Us | Closternam",meta_desc : "Closternam"};

  constructor(private cookie_service:CookieService, public datepipe: DatePipe, private page_service:PagesService,private title: Title,private meta: Meta,private formBuilder: FormBuilder, private http: HttpClient, public translate: TranslateService) {
      this.defaultLangCode = this.cookie_service.get('lang_code');
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }



  ngOnInit() {
    
    this.page_service.getCms('contact')
    .subscribe(response => {
      this.page = response;

      this.bannerImage = this.page.banner_image;

      this.title.setTitle(this.page.meta_title);
      this.meta.updateTag({ name: 'description', content: this.page.meta_desc });
    });

  	this.contactForm = this.formBuilder.group({
        contact_name: ['', [Validators.required,Validators.minLength(3), this.noWhitespaceValidator]],
        contact_phone: ['', [Validators.required,Validators.minLength(7), this.noWhitespaceValidator]],
        contact_message: ['', [Validators.required,Validators.minLength(5), this.noWhitespaceValidator]],
        contact_email: ['', [Validators.required,Validators.email]],
        contact_lang: [''],
    });

    this.paymentForm = this.formBuilder.group({
        payment_first_name: ['', [Validators.required,Validators.minLength(3), this.noWhitespaceValidator]],
        payment_last_name: ['', [Validators.required,Validators.minLength(3), this.noWhitespaceValidator]],
        payment_mv: ['', [Validators.required,Validators.minLength(3), this.noWhitespaceValidator]],
        payment_street_name: ['', [Validators.required,Validators.minLength(5),this.noWhitespaceValidator]],
        payment_postcode: ['', [Validators.required,Validators.minLength(5), this.noWhitespaceValidator]],
        payment_place: ['', [Validators.required,Validators.minLength(3), this.noWhitespaceValidator]],
        payment_phone: ['', [Validators.required,Validators.minLength(7), this.noWhitespaceValidator]],
        payment_kuk: [''],
        payment_email: ['', [Validators.required,Validators.email]],
        payment_birthplace: ['', [Validators.required,Validators.minLength(5), this.noWhitespaceValidator]],
        payment_id_number: ['', [Validators.required,Validators.minLength(5), this.noWhitespaceValidator]],
        payment_company_name: [''],//, [Validators.required,Validators.minLength(5)]],
        payment_bank_account: ['', [Validators.required,Validators.minLength(7), this.noWhitespaceValidator]],
        payment_dob: ['', [Validators.required]],
        payment_doc: ['', [Validators.required]],
        contact_lang: [''],
    });

  	this.title.setTitle(this.page.meta_title);
    this.meta.updateTag({ name: 'description', content: this.page.meta_desc});
  }

  get f() { return this.contactForm.controls; }
  get fPay() { return this.paymentForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
        console.log(this.f);
        return;
    }
    this.contactForm.value.contact_lang = this.cookie_service.get('lang_code');
    this.http.post(this.simpleContactPath, this.contactForm.value).subscribe(
	    (response:any) => {
        if(response.status == true){
          this.showSuccessMsg = true;
        }
        else{
          this.showFailureMsg = true;
        }

        setTimeout(() => {
          this.showSuccessMsg = false;
          this.showFailureMsg = false;

          this.submitted = false;
          this.contactForm.reset();         
          
        }, 5000);
      },
	    (error:any) => {

        this.showFailureMsg = true;
        if(error.status == 422){
          this.serverError = '';
          this.serverError+= '<ul>';
          
          if(error.error.errors.contact_name && typeof error.error.errors.contact_name != undefined )
            this.serverError+='<li>'+error.error.errors.contact_name+'</li>';

          if(error.error.errors.contact_phone && typeof error.error.errors.contact_phone != undefined )
            this.serverError+='<li>'+error.error.errors.contact_phone+'</li>';

          if(error.error.errors.contact_email && typeof error.error.errors.contact_email != undefined )
            this.serverError+='<li>'+error.error.errors.contact_email+'</li>';

          if(error.error.errors.contact_message && typeof error.error.errors.contact_message != undefined )
            this.serverError+='<li>'+error.error.errors.contact_message+'</li>';
          
        }
        else{

          this.serverError = 'Failed';
        }

        setTimeout(() => {
          this.showSuccessMsg = false;
          this.showFailureMsg = false;
          this.submitted = false;          
        }, 5000);
      }
	  )

  }

  onPaymentSubmit() {
    this.paymentSubmitted = true;
    if (this.paymentForm.invalid) {
        return;
    }
    
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    
    myFormData.append('payment_first_name', this.paymentForm.value.payment_first_name);
    myFormData.append('payment_last_name', this.paymentForm.value.payment_last_name);
    myFormData.append('payment_mv', this.paymentForm.value.payment_mv);
    myFormData.append('payment_street_name', this.paymentForm.value.payment_street_name);
    myFormData.append('payment_postcode', this.paymentForm.value.payment_postcode);
    myFormData.append('payment_place', this.paymentForm.value.payment_place);
    myFormData.append('payment_phone', this.paymentForm.value.payment_phone);
    myFormData.append('payment_email', this.paymentForm.value.payment_email);
    myFormData.append('payment_dob', this.datepipe.transform(this.paymentForm.value.payment_dob, 'yyyy-MM-dd'));
    myFormData.append('payment_birthplace', this.paymentForm.value.payment_birthplace);
    myFormData.append('payment_id_number', this.paymentForm.value.payment_id_number);
    myFormData.append('payment_bank_account', this.paymentForm.value.payment_bank_account);
    myFormData.append('payment_company_name', this.paymentForm.value.payment_company_name);
    myFormData.append('payment_kuk', this.paymentForm.value.payment_kuk);
    myFormData.append('payment_doc', this.fileToUpload);
    myFormData.append('contact_lang', this.cookie_service.get('lang_code'));
   

    this.http.post(this.paymentContactPath,  myFormData, {
        headers: headers
      }).subscribe(
      (response:any) => {
        if(response.status == true){
          this.showPSuccessMsg = true;
        }
        else{
          this.showPFailureMsg = true;
        }

        setTimeout(() => {
          this.showPSuccessMsg = false;
          this.showPFailureMsg = false;

          this.paymentSubmitted = false;
          this.paymentForm.reset();
          if(response.status == true){
            window.location.href = response.url;
          }        
          
        }, 5000);
      },
      (error:any) => {

        this.showPFailureMsg = true;
        if(error.status == 422){
          this.serverError = '';
          this.serverError+= '<ul>';
          
          if(error.error.errors.contact_name && typeof error.error.errors.contact_name != undefined )
            this.serverError+='<li>'+error.error.errors.contact_name+'</li>';

          if(error.error.errors.contact_phone && typeof error.error.errors.contact_phone != undefined )
            this.serverError+='<li>'+error.error.errors.contact_phone+'</li>';

          if(error.error.errors.contact_email && typeof error.error.errors.contact_email != undefined )
            this.serverError+='<li>'+error.error.errors.contact_email+'</li>';

          if(error.error.errors.contact_message && typeof error.error.errors.contact_message != undefined )
            this.serverError+='<li>'+error.error.errors.contact_message+'</li>';
          
        }
        else{

          this.serverError = 'Failed';
        }

        setTimeout(() => {
          this.showPSuccessMsg = false;
          this.showPFailureMsg = false;
          this.paymentSubmitted = false;

        }, 5000);
      }
    )

  }

  onReset() {
	    this.submitted = false;
	    this.contactForm.reset();
	}

  onpayReset() {
      this.paymentSubmitted = false;
      this.paymentForm.reset();
  }



  toogleForm(formType){
    if(formType == 1){      
      this.paymentFormShow = false;
      this.contactFormShow = true;
    }
    else if(formType == 2){
      this.paymentFormShow = true;
      this.contactFormShow = false;
    }
  }

  getBackgroundImageUrl(){
    return `url(https://www.cloostermanvaluefund.nl/uploads/cms/images/${this.bannerImage})`;
  }

  handleFileInput(files: FileList) {
  console.log(this.fileToUpload)
      this.fileToUpload = files.item(0);
  console.log(this.fileToUpload)
  }

}
