import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
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

interface InvalidData {
  invalidUsername: boolean;
  invalidName: boolean;
  invalidEmail: boolean;
  invalidAddress: boolean;
  invalidPassword: boolean;
  invalidPasswordCheck: boolean;
  usernameMessage: string;
  nameMessage: string;
  emailMessage: string;
  addressMessage: string;
  passwordMessage: string;
  passwordCheckMessage: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUserData: RegisterResponse = {
    username: '',
    name: '',
    email: '',
    address: '',
    password: '',
    passwordCheck: '',
  };

  invalidData: InvalidData = {
    invalidUsername: true,
    invalidName: true,
    invalidEmail: true,
    invalidAddress: true,
    invalidPassword: true,
    invalidPasswordCheck: true,
    usernameMessage: '',
    nameMessage: '',
    emailMessage: '',
    addressMessage: '',
    passwordMessage: '',
    passwordCheckMessage: '',
  };

  constructor(private backend: BackendService, private auth: AuthService, private router: Router) {}

  validateData() {
    const { username, name, email, address, password, passwordCheck } = this.newUserData;

    // only letters
    const letterStartRegex = RegExp(/^[a-zA-Z]/);
    const letterNumberGlobalRegex = RegExp(/^[a-zA-Z0-9]+$/);

    if (!username) {
      this.invalidData.usernameMessage = 'username is required';
      this.invalidData.invalidUsername = true;
    } else if (!letterStartRegex.test(username)) {
      this.invalidData.usernameMessage = 'username must start with a letter';
      this.invalidData.invalidUsername = true;
    } else if (!letterNumberGlobalRegex.test(username)) {
      this.invalidData.usernameMessage = 'username must contain only letters and numbers';
      this.invalidData.invalidUsername = true;
    } else if (username.length < 3) {
      this.invalidData.usernameMessage = 'username must be at least 3 characters';
      this.invalidData.invalidUsername = true;
    } else if (username.length > 20) {
      this.invalidData.usernameMessage = 'username cannot exceed 20 characters';
      this.invalidData.invalidUsername = true;
      // if all other validation is met check whether username already exists
    } else {
      this.backend.checkUsernames(username).then((userExists: Boolean) => {
        console.log(userExists);
        if (userExists) {
          this.invalidData.usernameMessage = 'username is already in use';
          this.invalidData.invalidUsername = true;
        } else {
          this.invalidData.usernameMessage = '';
          this.invalidData.invalidUsername = false;
        }
      });
    }

    if (!password) {
      this.invalidData.passwordMessage = 'password is required';
      this.invalidData.invalidPassword = true;
    } else if (password.length < 6) {
      this.invalidData.passwordMessage = 'password must be at least 6 characters';
      this.invalidData.invalidPassword = true;
    } else if (password.length > 20) {
      this.invalidData.passwordMessage = 'password cannot exceed 20 characters';
      this.invalidData.invalidPassword = true;
    } else {
      this.invalidData.passwordMessage = '';
      this.invalidData.invalidPassword = false;
    }

    if (!passwordCheck) {
      this.invalidData.passwordCheckMessage = 'password confirmation is required';
      this.invalidData.invalidPasswordCheck = true;
    } else if (passwordCheck !== password) {
      this.invalidData.passwordCheckMessage = 'passwords do not match';
      this.invalidData.invalidPasswordCheck = true;
    } else {
      this.invalidData.passwordCheckMessage = '';
      this.invalidData.invalidPasswordCheck = false;
    }

    if (name.length === 0) {
      // name not required
      this.invalidData.nameMessage = '';
      this.invalidData.invalidName = false;
    } else if (name.length > 100) {
      this.invalidData.nameMessage = 'name cannot exceed 100 characters';
      this.invalidData.invalidName = true;
    } else {
      this.invalidData.nameMessage = '';
      this.invalidData.invalidName = false;
    }

    if (email.length === 0) {
      // email not required
      this.invalidData.emailMessage = '';
      this.invalidData.invalidEmail = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      this.invalidData.emailMessage = 'email not formatted correctly';
      this.invalidData.invalidEmail = true;
    } else if (email.length > 100) {
      this.invalidData.emailMessage = 'email cannot exceed 100 characters';
      this.invalidData.invalidEmail = true;
    } else {
      this.invalidData.emailMessage = '';
      this.invalidData.invalidEmail = false;
    }

    if (address.length === 0) {
      // address not required
      this.invalidData.addressMessage = '';
      this.invalidData.invalidAddress = false;
    } else if (address.length > 100) {
      this.invalidData.addressMessage = 'address cannot exceed 100 characters';
      this.invalidData.invalidAddress = true;
    } else {
      this.invalidData.addressMessage = '';
      this.invalidData.invalidAddress = false;
    }
  }

  register() {
    // if any form fields not valid, then return out
    if (
      this.invalidData.invalidUsername ||
      this.invalidData.invalidName ||
      this.invalidData.invalidEmail ||
      this.invalidData.invalidAddress ||
      this.invalidData.invalidPassword ||
      this.invalidData.invalidPasswordCheck
    ) {
      return;
    }

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
