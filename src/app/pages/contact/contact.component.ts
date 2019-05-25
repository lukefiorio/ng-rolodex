import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

interface ContactData {
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
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  user: any = [];
  contactDetail: any = {};
  showViewModal: boolean = false;
  showEditModal: boolean = false;
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
  }

  editDetail(id) {
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
