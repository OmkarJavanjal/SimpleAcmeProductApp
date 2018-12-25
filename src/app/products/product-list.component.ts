import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    sortByAscDesc: boolean = true;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private _productService: ProductService) {

    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
              product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    sortType(sort: string){
        if(sort=='name'){
            this.filteredProducts = this.filteredProducts.sort(this.sortByAscDesc? this.sortByProductNameAsc : this.sortByProductNameDesc); 
            this.sortByAscDesc = !this.sortByAscDesc;
        }
    }

    sortByProductNameAsc(a: IProduct, b: IProduct){
        if(a.productName > b.productName) return 1
            else if(a.productName === b.productName) return 0
                else return -1;
    }        
    
    sortByProductNameDesc(a: IProduct, b: IProduct){
        if(a.productName < b.productName) return 1
            else if(a.productName === b.productName) return 0
                else return -1;
    }        

    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                    error => this.errorMessage = <any>error);
    }
}
