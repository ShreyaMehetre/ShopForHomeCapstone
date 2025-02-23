import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    productId: 0,
    productName: '',
    description: '',
    price: 0,
    rating: 0,
    stockQuantity: 0,
    categoryId: 1,
    imageUrl: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { productId: 0, productName: '', description: '', price: 0, rating: 0, stockQuantity: 0, categoryId: 1, imageUrl: '' };
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}