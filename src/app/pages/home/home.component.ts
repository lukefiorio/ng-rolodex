import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchName: {
    name: string;
  } = {
    name: '',
  };

  foundNames: {
    name: string;
  }[] = [];

  showViewModal: boolean = false;
  contactDetail: any = {};

  constructor(private backend: BackendService) {}

  ngOnInit() {}

  showDetail(id) {
    this.backend.getContact(id).then((data: any) => {
      this.contactDetail = data;
      this.showViewModal = true;
    });
  }

  hideDetail() {
    this.showViewModal = false;
  }

  submit() {
    const { name } = this.searchName;

    if (name === '') {
      this.foundNames = [];
    } else {
      this.backend.searchContacts(name).then((data: { name: string }[]) => {
        this.foundNames = data;
      });
    }
  }
}
