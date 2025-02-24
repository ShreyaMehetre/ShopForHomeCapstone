import { Component, OnInit } from '@angular/core';
import { WishlistService, WishlistItem } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];
  wishlistCount: number = 0;
  loading = false;
  wishListId = 0;

  constructor(private wishlistService: WishlistService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadWishlist();
    this.subscribeToWishlistCount();
  }

  loadWishlist(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found. Cannot fetch wishlist.');
      return;
    }

    this.loading = true;
    this.wishlistService.getWishlist(Number(userId)).subscribe({
      next: (items) => {
        this.wishlist = items;
        this.loading = false;
      },
      error: () => {
        this.wishlist = [];
        this.loading = false;
      }
    });
  }

  toggleWishlist(productId: number): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found. Cannot add to wishlist.');
      return;
    }

    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId);
    } else {
      this.wishlistService.addToWishlist(productId, Number(userId)).subscribe(() => {
        this.loadWishlist();
      });
    }
  }
  
  removeFromWishlist(productId: number): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found. Cannot remove from wishlist.');
      return;
    }

    this.wishlistService.removeFromWishlist(productId, Number(userId)).subscribe(() => {
      this.wishlist = this.wishlist.filter(item => item.productId !== productId);
      this.wishlistService.refreshWishlistCount(Number(userId)); // ✅ Ensure count updates
    });
  }
  

  clearWishlist(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found. Cannot clear wishlist.');
      return;
    }

    this.wishlistService.clearWishlist(Number(userId)).subscribe(() => {
      this.wishlist = [];
      this.wishlistService.updateWishlistCount(0); // ✅ Reset count
    });
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.some(item => item.productId === productId);
  }

  subscribeToWishlistCount(): void {
    this.wishlistService.wishlistCount$.subscribe(count => {
      console.log('Wishlist count updated:', count);
    });
  }
}