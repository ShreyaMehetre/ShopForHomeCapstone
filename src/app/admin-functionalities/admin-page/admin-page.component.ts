import { Component } from '@angular/core';
import { UserDetailsComponent } from '../user-crud/user-details/user-details.component';
import { ProductDetailsComponent } from '../product-crud/product-details/product-details.component';
import { CategoryDetailsComponent } from '../category-crud/category-details/category-details.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [UserDetailsComponent, ProductDetailsComponent, CategoryDetailsComponent, RouterOutlet],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
