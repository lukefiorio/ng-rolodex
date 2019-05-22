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

  addContact(
    id: number,
    name: string,
    address: string,
    mobile: string,
    work: string,
    home: string,
    email: string,
    twitter: string,
    instagram: string,
    github: string,
    created_by: number,
  ): Promise<object> {
    const newContact = { id, name, address, mobile, work, home, email, twitter, instagram, github, created_by };
    // arg1: route, arg2: body, arg3: header
    return this.http.post('/api/contacts?user=1', newContact).toPromise();
  }

  searchContacts(name: string): Promise<object> {
    return this.http.get(`/api/contacts/search/${name}?user=1`).toPromise();
  }

  editContact(id: string): Promise<object> {
    // need to plug actual body in arg2
    return this.http.put(`api/contacts/${id}`, 1).toPromise();
  }

  deleteContact(id: string): Promise<object> {
    return this.http.delete(`api/contacts/${id}`).toPromise();
  }
}
