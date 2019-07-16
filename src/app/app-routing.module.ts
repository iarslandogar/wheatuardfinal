import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../app/login/login.component'
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: '', loadChildren: './Mian/menu/menu.module#MenuPageModule' , 
  // canActivate: [AuthGuard] 
},

  { path: '**', component : LoginComponent, 
  // canActivate: [AuthGuard]
 }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
