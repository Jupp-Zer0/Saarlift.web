import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'https://saarlift.eu/php/appointments.php'; // replace with your API URL

  constructor(private http: HttpClient) { }

  createAppointment(appointment: { service: string, date: string, userId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appointment);
  }
}
