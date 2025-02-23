import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7246/api';

  // BehaviorSubject to track login status
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable(); // Observable for real-time updates

  constructor(private http: HttpClient) {}

  // Login API Call
  jwtLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login/login`, data).pipe(
      tap((response: any) => {
        if (response.accessToken) {
          this.setSession(response.accessToken, response.roleId);
        }
      })
    );
  }

  // Register API Call
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users`, userData);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false); // Notify all subscribers that user is logged out
  }

  // Store user session
  private setSession(token: string, roleId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', roleId);
    this.loggedIn.next(true); // Notify all subscribers that user is logged in
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get User Role
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Get Auth Headers for API requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}