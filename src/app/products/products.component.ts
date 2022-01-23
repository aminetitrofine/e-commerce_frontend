import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  public editPhoto!: boolean;
  public currentProduct: any;
  public selectedFiles: any;
  public progress!: number;
  private currentFileUpload: any;
  public title!:string;
  timestamp:number=0;

  constructor(
    public catService:CatalogueService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
    ) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) =>{
      if (val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params['p1'];
        if(p1==1) {
          this.title="Selected Products"
          this.getProducts('/products/search/selectedProducts');
        }
        else if (p1==2){

          let idCat=this.route.snapshot.params['p2']
          this.title="Products of the category"+ idCat;
          this.getProducts('/categories/' + idCat + '/products');
        }
        else if (p1==3){
          this.title="Products on discount";
          this.getProducts('/products/search/promoProducts');
        }
        else if (p1==4){
          this.title="Available products";
          this.getProducts('/products/search/availableProducts');
        }
        else if (p1==5){
          this.title="Research results";
          this.getProducts('/products/search/availableProducts');
        }
      }

    });
    let p1 = this.route.snapshot.params['p1'];
    if(p1==1) {
      this.getProducts('/products/search/selectedProducts');
    }
  }

  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      },err =>{
        console.log(err)
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
  public isAdmin(){
    return this.authService.isAdmin()
  }
}
