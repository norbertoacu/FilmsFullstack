import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFilmsPageRoutingModule } from './my-films-routing.module';

import { MyFilmsPage } from './my-films.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFilmsPageRoutingModule
  ],
  declarations: [MyFilmsPage]
})
export class MyFilmsPageModule {}
