import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

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
    return this.http.post(`${this.apiUrl}/Users/Register`, userData);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
    this.loggedIn.next(false); // Notify all subscribers that user is logged out
  }

  // Store user session
  private setSession(token: string, roleId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('roleId', roleId);
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
  getUserId(): number {
    const token = this.getToken();
    if (!token) {
      console.error('🔴 No token found. User might not be logged in.');
      return 0;
    }
  
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('✅ Decoded Token:', decodedToken); // Debugging
      return decodedToken?.nameid ? parseInt(decodedToken.nameid, 10) : 0;
    } catch (error) {
      console.error('🔴 Error decoding token:', error);
      return 0;
    }
  }  
}