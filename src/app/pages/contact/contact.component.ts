import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

interface ContactData {
  name: string;
  address: string;
  mobile: string;
  work: string;
  home: string;
  email: string;
  twitter: string;
  instagram: string;
  github: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  user: any = [];
  contactDetail: any = {};
  showViewModal: boolean = false;
  showEditModal: boolean = false;

  updateContactData: ContactData = {
    name: '',
    address: '',
    mobile: '',
    work: '',
    home: '',
    email: '',
    twitter: '',
    instagram: '',
    github: '',
  };

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getContacts().then((data: any) => {
      this.user = data;
    });
  }

  showDetail(id) {
    this.backend.getContact(id).then((data: any) => {
      // maybe call this something else
      this.contactDetail = data;
      this.showViewModal = true;
    });
  }

  showEdit(id) {
    this.showViewModal = false;
    this.showEditModal = true;
    this.backend.getContact(id).then((data: any) => {
      this.updateContactData.name = data.name;
      this.updateContactData.address = data.address;
      this.updateContactData.mobile = data.mobile;
      this.updateContactData.work = data.work;
      this.updateContactData.home = data.home;
      this.updateContactData.email = data.email;
      this.updateContactData.twitter = data.twitter;
      this.updateContactData.instagram = data.instagram;
      this.updateContactData.github = data.github;
    });
  }

  editDetail(id) {
    const updatedContact = this.updateContactData;
    this.backend.editContact(id, updatedContact).then((data: ContactData) => {
      this.user = data;
      this.showDetail(id);
    });

    this.showEditModal = false;
  }

  hideDetail() {
    this.showViewModal = false;
  }

  hideEdit() {
    this.showEditModal = false;
  }

  delete(id) {
    this.backend.deleteContact(id).then((data: any) => {
      this.user = data;
      this.showViewModal = false;
    });
  }
}
