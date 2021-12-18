import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: "full" ,
    loadChildren: () => import("@features/homepage/homepage.module").then(m => m.HomepageModule)
  },
  { 
    path: 'search',
    loadChildren: () => import("@features/searchpage/searchpage.module").then(m => m.SearchpageModule)
  },
  // { path: 'property', component: DetailspageComponent, pathMatch: "full"},
  { 
    path: 'property/:id', 
    loadChildren: () => import('@features/detailspage/detailspage.module').then(m => m.DetailsModule) 
  },
  {
    path: '404',
    loadChildren: () => import("@features/not-found/not-found.module").then(m => m.NotFoundModule)
  },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
