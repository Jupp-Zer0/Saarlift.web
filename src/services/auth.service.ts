import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { Appointment } from '../app/appointment.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimeout: any;
  private loggedInStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  }

  updateUser(user: any): Observable<any> {
    return this.http.put('https://saarlift.eu/php/update-user.php', user);
  }

  getUserData(userId: number): Observable<any> {
    return this.http.get(`https://saarlift.eu/php/get-user.php?userId=${userId}`);
  }
  
  scheduleAppointment(appointment: any) {
    return this.http.post<any>('https://saarlift.eu/php/appointments.php', appointment);
  }
  getAppointments(userId: number): Observable<Appointment[]> {
    // Replace the URL with the actual endpoint to fetch the appointments
    return this.http.get<Appointment[]>(`https://saarlift.eu/php/appointments.php?userId=${userId}`);
  }
  login(password: string, userData: any): void {
    const user = {
      id: userData.Id, // Use the Id from the response
      ...userData,
      password
    };
  
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user)); // Store user data
  
    this.scheduleLogout();
    this.loggedInStatus.next(true);
  }
  

  getLoggedInUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;
      console.log('Parsed user:', parsedUser);
      return parsedUser;
    }
    return null;
  }

  

  logout(): void {
    clearTimeout(this.logoutTimeout);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user'); // Remove user data
    }
    // Handle the case where localStorage is not available
  }

  // Rest of your code...

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('loggedIn') === 'true';
    } else {
      // Provide a fallback or throw an error
      return false;
    }
  }


  getLoggedInStatus(): Subject<boolean> {
    return this.loggedInStatus;
  }

  private scheduleLogout(): void {
    this.logoutTimeout = setTimeout(() => this.logout(), 10 * 60 * 1000);
  }

  // New method to get the logged in user's data
  
}