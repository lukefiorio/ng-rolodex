import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any = {};

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getProfile().then((data: any) => {
      this.profile = data;
    });
  }

  edit(id) {
    this.backend.editContact(id).then((data: any) => {
      this.profile = data;
    });
  }

  delete(id) {
    this.backend.deleteContact(id).then((data: any) => {
      this.profile = data;
    });
  }
}
