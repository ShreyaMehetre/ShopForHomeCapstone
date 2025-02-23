import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userModel: any = {
    fullName: '',
    email: '',
    password: '',
    address: '',
    userId: '',
    roleId: '',
    accessToken: '',
  };

  constructor(private authService: AuthService, private router: Router) {}
  onLogin(user: any): void {
    console.log("Sending request:", user);
    this.authService.jwtLogin(user).subscribe((response) => {
      this.userModel = response;
      console.log(response);
      if (this.userModel != undefined) {
        localStorage.setItem('token', this.userModel.accessToken);
        localStorage.setItem('roleId', this.userModel.roleId);
        localStorage.setItem('userId', this.userModel.userId);
        alert('Login Successfull');
        if (this.userModel.roleId == 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/products']);
        }
      } else {
        alert('Oops! You are not registered.');
        this.router.navigate(['/register']);
      }
    });
  }
}
