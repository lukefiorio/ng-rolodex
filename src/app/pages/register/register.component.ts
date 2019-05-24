import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface RegisterResponse {
  username: string;
  name: string;
  email: string;
  address: string;
  password: string;
  passwordCheck: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  newUserData: RegisterResponse = {
    username: '',
    name: '',
    email: '',
    address: '',
    password: '',
    passwordCheck: '',
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  register() {
    this.auth
      .register(this.newUserData)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }
}
