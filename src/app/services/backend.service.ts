import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getContacts(): Promise<object> {
    return this.http.get('/api/contacts').toPromise();
  }

  getProfile(): Promise<object> {
    return this.http.get('/api/profile').toPromise();
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
    return this.http.post('/api/contacts', newContact).toPromise();
  }

  checkUsernames(username: string): Promise<object> {
    return this.http.get(`api/users?username=${username}`).toPromise();
  }

  searchContacts(name: string): Promise<object> {
    return this.http.get(`/api/contacts/search/${name}`).toPromise();
  }

  editContact(id: string): Promise<object> {
    // need to plug actual body in arg2
    return this.http.put(`api/contacts/${id}`, 1).toPromise();
  }

  deleteContact(id: string): Promise<object> {
    return this.http.delete(`api/contacts/${id}`).toPromise();
  }

  register(registerData: {
    username: string;
    name: string;
    email: string;
    address: string;
    password: string;
    passwordCheck: string;
  }) {
    return this.http.post('/api/register', registerData).toPromise();
  }

  login(loginData: { username: string; password: string }): Promise<object> {
    return this.http.post('/api/login', loginData).toPromise();
  }

  logout() {
    return this.http.get('/api/logout').toPromise();
  }
}
