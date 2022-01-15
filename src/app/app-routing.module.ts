import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [
  {path:'products/:p1/:p2', component:ProductsComponent},
  {path:'', redirectTo:'products/:p1/:p2',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
