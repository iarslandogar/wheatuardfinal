import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';





const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
      { path: 'changepassword', loadChildren: '../changepassword/changepassword.module#ChangepasswordPageModule' },
      { path: 'aboutus', loadChildren: '../aboutus/aboutus.module#AboutusPageModule' },
      { path: 'logout', loadChildren: '../logout/logout.module#LogoutPageModule' },
    ]
  },{path:'',redirectTo:'/menu/home'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
