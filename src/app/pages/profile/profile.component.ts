import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

interface ProfileData {
  name: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  showEditModal: boolean = false;

  updateProfile: ProfileData = {
    name: '',
    email: '',
    address: '',
  };

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getProfile().then((data: any) => {
      this.profile = data;
    });
  }

  showEdit() {
    this.showEditModal = true;
    this.backend.getProfile().then((data: any) => {
      this.updateProfile.name = data.name;
      this.updateProfile.address = data.address;
      this.updateProfile.email = data.email;
    });
  }

  editProfile() {
    const updatedProfile = this.updateProfile;
    this.backend.editProfile(updatedProfile).then((data: ProfileData) => {
      this.profile = data;
      this.showEditModal = false;
    });
  }

  hideEdit() {
    this.showEditModal = false;
  }
}
