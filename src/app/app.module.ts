import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AgmCoreModule } from '@agm/core'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCreateStoreComponent } from './admin/admin-create-store/admin-create-store.component';
import { AdminStoreDetailsComponent } from './admin/admin-store-details/admin-store-details.component';
import { AdminStoreListComponent } from './admin/admin-store-list/admin-store-list.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './auth/error-interceptor.service';
import { HomeComponent } from './home/home.component';
import { MustMatchDirective } from './_helpers/validators/must-match.directive';
import { MedicalStoreComponent } from './store/medical-store/medical-store.component';
import { BloodBankComponent } from './store/blood-bank/blood-bank.component';
import { AddMedicineComponent } from './store/medical-store/add-medicine/add-medicine.component';
import { MedicineListComponent } from './store/medical-store/medicine-list/medicine-list.component';
import { MedicineDetailsComponent } from './store/medical-store/medicine-details/medicine-details.component';
import { AddBloodComponent } from './store/blood-bank/add-blood/add-blood.component';
import { BloodListComponent } from './store/blood-bank/blood-list/blood-list.component';
import { BloodDetailsComponent } from './store/blood-bank/blood-details/blood-details.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { MailComponent } from './mail/mail.component';
import { MailDetailComponent } from './mail/mail-detail/mail-detail.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { SearchStoreComponent } from './search/search-store/search-store.component';
import { StoreListComponent } from './general/store-list/store-list.component';
import { StoreInfoComponent } from './general/store-list/store-info/store-info.component';
import { MapComponent } from './general/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminCreateStoreComponent,
    AdminStoreDetailsComponent,
    AdminStoreListComponent,
    LoginComponent,
    HomeComponent,
    MustMatchDirective,
    MedicalStoreComponent,
    BloodBankComponent,
    AddMedicineComponent,
    MedicineListComponent,
    MedicineDetailsComponent,
    AddBloodComponent,
    BloodListComponent,
    BloodDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    MailComponent,
    MailDetailComponent,
    ResetPasswordComponent,
    SearchResultsComponent,
    SearchStoreComponent,
    StoreListComponent,
    StoreInfoComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBslpv1ONlUOoqFBXut8ivPEPxFl9mcMYI',
      libraries: ['places']
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
