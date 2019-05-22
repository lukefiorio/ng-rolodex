import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getContacts(): Promise<object> {
    return this.http.get('/api/contacts?user=1').toPromise();
  }

  getProfile(): Promise<object> {
    return this.http.get('/api/profile?user=1').toPromise();
  }
}
