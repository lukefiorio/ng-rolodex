import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

// interface ContactsResponse {}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  user: any = [];
  contactDetail: any = {};
  showViewModal: boolean = false;
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

  hideDetail() {
    this.showViewModal = false;
  }

  delete(id) {
    this.backend.deleteContact(id).then((data: any) => {
      this.user = data;
    });
  }
}
