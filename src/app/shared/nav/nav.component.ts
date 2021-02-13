import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  adminFlag :any

  constructor(
    private adminService: AdminService,
    private msg : MessengerService
    ) { }

  ngOnInit(): void {
    // this.adminFlag = this.adminService.adminFlag
    this.adminFlag = this.handleSubscription()
    console.log(this.adminFlag)
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((loginCreds) => {
      console.log(loginCreds)
    })
  }

}
