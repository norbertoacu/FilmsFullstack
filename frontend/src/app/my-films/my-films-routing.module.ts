import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFilmsPage } from './my-films.page';

const routes: Routes = [
  {
    path: '',
    component: MyFilmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFilmsPageRoutingModule {}
