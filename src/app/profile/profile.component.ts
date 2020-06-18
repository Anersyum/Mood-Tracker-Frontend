import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model = {
    username: null
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.model.username = this.userService.getUsernameFromToken(localStorage.getItem('token'));
  }

  onSubmit() {

    console.log(this.model);
  }

}
