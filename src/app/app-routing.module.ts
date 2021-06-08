import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailspageComponent } from '@features/detailspage/detailspage.component';
import { HomepageComponent } from '@features/homepage/homepage.component';
import { NotFoundComponent } from '@features/not-found/not-found.component';
import { SearchpageComponent } from '@features/searchpage/searchpage.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: "full" },
  { path: 'search', component: SearchpageComponent },
  // { path: 'property', component: DetailspageComponent, pathMatch: "full"},
  { path: 'property/:id', component:DetailspageComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
