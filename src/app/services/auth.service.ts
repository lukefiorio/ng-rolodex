import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl = '';
  constructor(private backend: BackendService, private session: SessionService) {}

  register(data) {
    return this.backend.register(data).then((response) => {
      return this.session.setSession(data.username);
    });
  }

  login(loginData: { username: string; password: string }) {
    // 2nd line of promise wont execute if db rejects
    return this.backend.login(loginData).then((response) => {
      return this.session.setSession(loginData.username);
    });
  }

  logout() {
    return this.backend.logout().then((response) => {
      return this.session.clearSession();
    });
  }
}
