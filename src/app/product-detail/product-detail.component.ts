import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../catalogue.service";
import {Product} from "../model/product.model";
import {AuthenticationService} from "../services/authentication.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public currentProduct!: Product;
  editPhoto!: Boolean;
  progress!: number;
  mode: number=0;
  private selectedFiles: any;
  private currentFileUpload: any;
  timestamp!: number;
  constructor(private router:Router, public route:ActivatedRoute,
              public catService:CatalogueService,
              public authService:AuthenticationService
  ) { }

  ngOnInit() {
    let url=atob(this.route.snapshot.params['url'])
    this.catService.getProduct(url).subscribe(data=>{
      this.currentProduct=data;
    })

  }
  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }


  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(this.progress)
      } else if (event instanceof HttpResponse) {
        this.timestamp=Date.now();

      }
    },err=>{
      alert("Problème de chargement");
    })

    this.selectedFiles = undefined
  }

  getTS() {
    return this.timestamp;
  }
  onEditProduct(){
    this.mode=1;
  }
  public isAdmin(){
    return this.authService.isAdmin()
  }


  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catService.patchResource(url,data)
      .subscribe(data=>{
        this.currentProduct=data;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }

  onProductDetails(p:Product) {
    let url=btoa(p._links.product.href);
    this.router.navigateByUrl("product-details/" + url);
  }

  onAddProductToCaddy(currentProduct: Product) {
    
  }
}
