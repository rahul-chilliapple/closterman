import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { CookiesUseComponent } from './cookies-use/cookies-use.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DocumentsComponent } from './documents/documents.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { ForWhomComponent } from './for-whom/for-whom.component'
import { SuccessfulComponent } from './payment-response/successful/successful.component'
import { FailedComponent } from './payment-response/failed/failed.component'


const routes: Routes = [
	{ path: '', component: HomeComponent },
  	{ path: 'home', component: HomeComponent },
  	{ path: 'wat-bied-ik', component: OffersComponent },
  	{ path: 'privacy-policy', component: PrivacyPolicyComponent },
  	{ path: 'disclaimer', component: DisclaimerComponent },
  	{ path: 'cookies', component: CookiesUseComponent },
  	{ path: 'contact', component: ContactUsComponent },
  	{ path: 'documenten', component: DocumentsComponent },
  	{ path: 'wie-ben-ik', component: WhoWeAreComponent },
  	{ path: 'aan-wie', component: ForWhomComponent },
    { path: 'payment/success', component: SuccessfulComponent },
    { path: 'payment/failed', component: FailedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
