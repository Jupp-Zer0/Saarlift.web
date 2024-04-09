import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private url = 'https://saarlift.eu/php/database.php'; // replace with the path to your PHP file

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.url, { type: 'register', name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.url, { type: 'login', email, password });
  }

  
  getUserData(): Observable<any> {
    return this.http.get('../app/user.data.ts');
  }
}