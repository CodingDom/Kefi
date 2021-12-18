import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { SearchpageComponent } from './searchpage.component';

const routes: Routes = [
    { 
      path: '', 
      pathMatch: "full" ,
      component: SearchpageComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SearchpageRoutingModule { }
  