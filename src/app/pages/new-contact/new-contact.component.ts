import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

interface ContactsResponse {
  id: number;
  name: string;
  address: string;
  mobile: string;
  work: string;
  home: string;
  email: string;
  twitter: string;
  instagram: string;
  github: string;
  created_by: number;
}

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent implements OnInit {
  newContactData: {
    id: number;
    name: string;
    address: string;
    mobile: string;
    work: string;
    home: string;
    email: string;
    twitter: string;
    instagram: string;
    github: string;
    created_by: number;
  } = {
    id: 0,
    name: '',
    address: '',
    mobile: '',
    work: '',
    home: '',
    email: '',
    twitter: '',
    instagram: '',
    github: '',
    created_by: 0,
  };

  constructor(private backend: BackendService, private router: Router) {}

  ngOnInit() {}

  submit() {
    const {
      id,
      name,
      address,
      mobile,
      work,
      home,
      email,
      twitter,
      instagram,
      github,
      created_by,
    } = this.newContactData;

    this.backend
      .addContact(id, name, address, mobile, work, home, email, twitter, instagram, github, created_by)
      .then((data: ContactsResponse) => {
        this.newContactData = data;
        this.router.navigate(['/']);
      });
  }
}
