import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailspageComponent } from '@features/detailspage/detailspage.component';
import { HomepageComponent } from '@features/homepage/homepage.component';
import { SearchpageComponent } from '@features/searchpage/searchpage.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: "full" },
  { path: 'search', component: SearchpageComponent },
  { path: 'details', component: DetailspageComponent, pathMatch: "full"},
  { path: 'details/:id', component:DetailspageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
