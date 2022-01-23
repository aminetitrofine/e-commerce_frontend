import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
