import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
 import { AuthGuard } from './auth.guard';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
// import { GalerieComponent } from './galerie/galerie.component';
// import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';




const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'login',
    
        component: LoginComponent
      },{
        path: 'main',
     
        component: HomeComponent
      },
      {
        path: 'datenschutz',
     
        component: DatenschutzComponent
      },
      //{
      //   path: 'galerie',
      //   component: GalerieComponent,
       
      // },
      {
        path: 'register',
        component: RegisterComponent  
      },{
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'termin',
      //   component: ScheduleAppointmentComponent,
      //   canActivate: [AuthGuard]
      // },

      { path: '', redirectTo: 'main', pathMatch: 'full' },


    ]
  }
];








@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
  
})
export class AppRoutingModule {

 }
