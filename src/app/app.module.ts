import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { OffersComponent } from './offers/offers.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { CookiesUseComponent } from './cookies-use/cookies-use.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DocumentsComponent } from './documents/documents.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { ForWhomComponent } from './for-whom/for-whom.component';
import { CookieService } from 'ngx-cookie-service';
import { SuccessfulComponent } from './payment-response/successful/successful.component';
import { FailedComponent } from './payment-response/failed/failed.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OffersComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    CookiesUseComponent,
    ContactUsComponent,
    DocumentsComponent,
    WhoWeAreComponent,
    ForWhomComponent,
    SuccessfulComponent,
    FailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule
  ],
  providers: [Title,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
