import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecom-web';
  public categories;
  public currentCategory
  constructor(private catService:CatalogueService, private router:Router) {
  }
  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data =>{
        this.categories = data;
      },error => {
        console.log(error)
      })

  }

  getProductsByCat(c) {
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCategory= undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  onProductsPromo() {
    this.currentCategory= undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onProductsAvailable() {
    this.currentCategory= undefined;
    this.router.navigateByUrl('/products/4/0');
  }
}
