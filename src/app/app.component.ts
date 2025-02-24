import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cartCount: number = 0;
  wishlistCount: number = 0;
  title = 'ShopForHome';

  isUser = false;
  isAdmin: boolean = false;
  isLogin = false;

  constructor(
    private router: Router, 
    private cartService: CartService, 
    private authService: AuthService, 
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('roleId');
    
    // Check if the user is logged in
    this.isLogin = !!userRole; 

    if (userRole === '2') {
      this.isAdmin = true;
      this.isUser = false;
    } else {
      this.isUser = true;
      this.isAdmin = false;
    }

    // Subscribe to authentication status
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLogin = status;
      this.isUser = !this.isAdmin && status; 

      if (status) {
        const userId = this.authService.getUserId();

        // Subscribe to cart and wishlist counts
        this.cartService.cartCount$.subscribe(count => {
          this.cartCount = count;
        });

        this.wishlistService.wishlistCount$.subscribe(count => {
          this.wishlistCount = count;
        });

        this.wishlistService.refreshWishlistCount(userId);
      }
    });
  }

  logout() {
    this.authService.logout(); // Calls the logout function in AuthService
    this.isLogin = false;
    this.isUser = false;
    this.isAdmin = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}