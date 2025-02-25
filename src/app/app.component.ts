import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { WishlistService } from './services/wishlist.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cartCount: number = 0;
  wishlistCount: number = 0;
  title = 'ShopForHome';

  isAdmin = false;
  isLoggedIn = false;

  constructor(private router: Router, private cartService: CartService, private authService: AuthService, private wishlistService: WishlistService,) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.checkUserRole();

      if (status) {
        const userId = this.authService.getUserId();
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
    this.isAdmin = false;
    this.isLoggedIn = false;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }

  checkUserRole(): void {
    const roleId = localStorage.getItem('roleId');
    this.isAdmin = roleId === '1';
  }
}
