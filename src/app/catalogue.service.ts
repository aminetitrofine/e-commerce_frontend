import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./model/product.model";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host:string ="http://localhost:8080"


  constructor(private http:HttpClient ) {}

  public getResource(url){
    return this.http.get(this.host+url);
  }
  public getProduct(url):Observable<Product>{
    return this.http.get<Product>(url);
  }


  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  patchResource(url: string, data):Observable<Product> {
    return this.http.patch<Product>(url,data);
  }
}
