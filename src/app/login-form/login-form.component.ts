import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { MessengerService } from '../services/messenger.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private adminLogin : AdminService,
    private messenger : MessengerService,
    private msg: MessengerService
    ) { }

  ngOnInit(): void {
  }

  loginUser(e){
    // e.preventDefault();
    // console.log(e)

    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    var adminFlag = this.adminLogin.adminLogin(username,password)
    this.messenger.sendMsg(adminFlag)
    console.log(adminFlag)
    // console.log(username,password)

  }

}
