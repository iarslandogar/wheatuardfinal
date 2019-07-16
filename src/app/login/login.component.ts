import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  onSubmit(data:any){

    let user = {
      email: data.Email,
      password: data.Password
    }
    
    // this.auth.login(user).subscribe(res=>{
      this.router.navigateByUrl('/home');
    // },err=>{

    // })
    }
}
