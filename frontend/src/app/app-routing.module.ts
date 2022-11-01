import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./paginas/listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'datos',
    loadChildren: () => import('./paginas/datos/datos.module').then( m => m.DatosPageModule)
  },
  {
    path: 'my-films',
    loadChildren: () => import('./my-films/my-films.module').then( m => m.MyFilmsPageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
