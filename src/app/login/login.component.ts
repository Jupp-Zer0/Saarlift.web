import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service'; // replace with the actual path to your auth service
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  email: string = '';
  password: string = '';
  message: string = '';
  status: string = '';

  constructor(private titleService: Title,private router: Router,private metaService: Meta, private snackBar: MatSnackBar, private http: HttpClient, private authService: AuthService) {}
  ngOnInit() {
    this.titleService.setTitle('Anmelden - Saarlift');
    this.metaService.addTags([
      { name: 'description', content: 'Anmelde Formular' },
      { name: 'robots', content: 'noindex' }
    ]);
  }
  loginUser(email: string, password: string): void {
    const url = 'https://saarlift.eu/php/login.php';
    const formData = { email, password };
  
    this.http.post(url, formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          console.log('Login successful:', response);
          this.snackBar.open('User logged in successfully', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success']
          });
  
          const userData = response.user; // Get the user data from the response
          this.authService.login(password, userData); // Pass the user data to the login method
          this.router.navigate(['/account']); // navigate to the account component
        
          // Handle successful login, e.g., navigate to another page
        } else if (response.message === 'Invalid email or password') {
          console.log('Login failed:', response);
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-error']
          });
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
