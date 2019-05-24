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
  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getContacts().then((data: any) => {
      this.user = data;
    });
  }

  delete(id) {
    console.log('id', id);
    this.backend.deleteContact(id).then((data: any) => {
      this.user = data;
    });
  }
}
