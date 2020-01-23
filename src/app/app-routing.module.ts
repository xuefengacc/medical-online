import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MedicalStoreComponent } from './store/medical-store/medical-store.component';
import { BloodBankComponent } from './store/blood-bank/blood-bank.component';
import { SearchComponent } from './search/search.component';
import { MailComponent } from './mail/mail.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SearchStoreComponent } from './search/search-store/search-store.component';
import { StoreListComponent } from './general/store-list/store-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'medicine', component: MedicalStoreComponent, canActivate: [AuthGuard]},
  {path: 'blood', component:BloodBankComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent},
  {path: 'mail', component: MailComponent, canActivate: [AuthGuard]},
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'store/:email', component: SearchStoreComponent},
  {path: 'list/:type', component: StoreListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
