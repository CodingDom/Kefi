import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';
import { DetailspageComponent } from './detailspage.component';

const routes: Routes = [
    { 
      path: '', 
      pathMatch: "full" ,
      component: DetailspageComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DetailspageRoutingModule { }
  