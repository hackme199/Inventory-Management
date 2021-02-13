import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  adminFlag: boolean = false

  constructor(private router : Router) { }

  adminLogin(username,password) {
    if (username == 'admin' && password == 'aerocon'){
      this.router.navigate(['categories'])
      this.adminFlag = true
      return this.adminFlag
    }

    else {
      console.log('UNAUTHENTICATED')
      return this.adminFlag
    }
  }

}
