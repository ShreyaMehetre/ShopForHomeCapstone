import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7246/api/cart';
  
  private cartCount = new BehaviorSubject<number>(0); // Store cart item count
  cartCount$ = this.cartCount.asObservable(); // Observable to track changes

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Fetch cart items and update count
  getCartItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getHeaders() }).pipe(
      tap((cartItems: any) => {
        if (Array.isArray(cartItems)) {
          this.cartCount.next(cartItems.length);
        } else {
          this.cartCount.next(0); // Fallback if response is not an array
        }
      })
    );
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId, productQuantity: quantity }, { headers: this.getHeaders() })
      .pipe(tap(() => this.updateCartCount())); // Refresh cart count
  }

  increaseQuantity(cartId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/increase/${cartId}`, {}, { headers: this.getHeaders() })
      .pipe(tap(() => this.updateCartCount()));
  }

  decreaseQuantity(cartId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/decrease/${cartId}`, {}, { headers: this.getHeaders() })
      .pipe(tap(() => this.updateCartCount()));
  }

  removeFromCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${cartId}`, { headers: this.getHeaders() })
      .pipe(tap(() => this.updateCartCount()));
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`, { headers: this.getHeaders() })
      .pipe(tap(() => this.cartCount.next(0))); // Set count to 0 when clearing cart
  }

  // Refresh cart count after any action
  updateCartCount(): void {
    this.getCartItems().subscribe();
  }
}