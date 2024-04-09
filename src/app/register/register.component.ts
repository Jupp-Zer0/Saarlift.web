import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  registerForm: FormGroup;

  constructor(private snackBar: MatSnackBar,private http: HttpClient, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      
    });
  }
  registerUser(): void {
    const url = 'https://saarlift.eu/php/register.php';
    const formData = this.registerForm.value;
  
    this.http.post(url, formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          console.log('Registration successful:', response);
          this.snackBar.open('User registered successfully', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success']
          });
        } else if (response.message === 'Email already in use') {
          console.log('Registration failed:', response);
          this.snackBar.open('Email already in use', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-error']
          });
        } else {
          console.log('Registration failed:', response);
          this.snackBar.open('Registration failed', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-error']
          });
        }
      },
      (error) => {
        console.error('Registration failed:', error);
        this.snackBar.open('Registration failed', 'Close', {
          duration: 2000,
          panelClass: ['snackbar-error']
        });
      }
    );
}

}
