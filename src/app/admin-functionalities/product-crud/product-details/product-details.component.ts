import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
   products: any[] = [];
  
    constructor(private productService: ProductService, private router: Router) {}
  
    ngOnInit() {
      this.loadProducts();
    }
  
    // Fetch all users
    loadProducts() :void {
      this.productService.getAllProducts().subscribe(data => {
        this.products = data;
      });
    }
  
    // Navigate to update user page
    updateProduct(productId: number) {
      this.router.navigate([`/update-product`, productId]);
    }
  
    // Navigate to delete user page
    deleteProduct(productId: number) {
      this.router.navigate([`/delete-product`,productId]);
    }

    addProduct():void{
      this.router.navigate([`/add-product`])
    }
}
