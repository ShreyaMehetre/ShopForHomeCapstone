import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading: boolean = false;

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
        this.loading = false;
      },
      error: () => {
        this.cartItems = [];
        this.loading = false;
      }
    });
  }

  increaseQuantity(cartId: number): void {
    this.cartService.increaseQuantity(cartId).subscribe(() => {
      this.loadCart();
      this.showMessage('Quantity increased.');
    });
  }

  decreaseQuantity(cartId: number): void {
    this.cartService.decreaseQuantity(cartId).subscribe(() => {
      this.loadCart();
      this.showMessage('Quantity decreased.');
    });
  }

  removeFromCart(cartId: number): void {
    this.cartService.removeFromCart(cartId).subscribe(() => {
      this.loadCart();
      this.showMessage('Item removed from cart.');
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.loadCart();
      this.showMessage('Cart cleared.');
    });
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}