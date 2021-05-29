import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '@features/homepage/homepage.component';
import { SearchpageComponent } from '@features/searchpage/searchpage.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: "full" },
  { path: 'search', component: SearchpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
