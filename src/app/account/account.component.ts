import { AuthService } from '../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
;
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from '../appointment.model';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit, OnDestroy {
  user: any; // Declare the user property
  editForm: FormGroup; // Definiere die editForm-Eigenschaft als FormGroup
  fb: FormBuilder = new FormBuilder(); // Initialisierung von 'fb' im Konstruktor
  appointments: Appointment[] = [];
  isLoggedIn = false;
  private subscription: Subscription = new Subscription();
  services: string[] = ['Holzarbeit', 'Dacharbeit', 'Heizungsbauer'];
  selectedService!: string;
  appointmentDate!: string;
  appointmentTime!: string;
  appointmentNotes!: string; // Add this line


  constructor(private snackBar: MatSnackBar,private formBuilder: FormBuilder,private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getLoggedInUser();
    this.editForm = this.formBuilder.group({
      name: [this.user.name],
      password: [this.user.password]
    });
  }scheduleAppointment(): void {
    const appointment = {
      userId: this.user.id,
      service: this.selectedService,
      date: this.appointmentDate,
      time: this.appointmentTime,
      notes: this.appointmentNotes,
      status: 'pending',
    };
  
    this.authService.scheduleAppointment(appointment).subscribe((response: any) => {
      console.log('Termin vereinbart:', response);
  
      // Open the snackbar
      this.snackBar.open('Termin erfolgreich vereinbart!', 'Schließen', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
  
      // Fetch appointments again
      this.authService.getAppointments(this.user.id).subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
      });
  
    }, (error) => {
      // Handle error here
      this.snackBar.open('Ein Fehler ist Aufgetreten', 'Schließen', {
        duration: 5000, // The snackbar will be dismissed after 5 seconds
        panelClass: ['snackbar-error'],
      });
      console.error('Error:', error);
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getLoggedInUser();
    this.editForm = this.fb.group({
      name: [this.user.name],
      password: [this.user.password]
    });
    
    this.authService.getAppointments(this.user.id).subscribe((appointments: Appointment[]) => {
      this.appointments = appointments;
    });
    
  }
  onSubmit(): void {
    const updatedUser = {
      ...this.user,
      ...this.editForm.value,
      id: this.user.id, // Include the user id
      password: this.editForm.value.password, // Include the new password
    };
  
    this.authService.updateUser(updatedUser).subscribe(() => {
      this.user = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update the user data in localStorage
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}