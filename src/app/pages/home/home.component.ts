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

  constructor(private backend: BackendService) {}

  ngOnInit() {}

  submit() {
    console.log(this.searchName);
    const { name } = this.searchName;

    this.backend.searchContacts(name).then((data: { name: string }[]) => {
      this.foundNames = data;
    });
  }
}
