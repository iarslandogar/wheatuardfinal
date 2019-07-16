import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = "/api/v1"  

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

  getToken(): Object {
    let x = localStorage.getItem('token')
    let y =JSON.parse(x)
    if(y)
    return y.token;
    else
    return false
  }

  storeToken(Token:Object): void {
    localStorage.setItem('token',JSON.stringify(Token))
  }

  deleteToken(): void{
    localStorage.removeItem('token')
    // console.log("deleted")
    this.currentUserSubject.next(null)
  }

  getUsername(): string{
    let x = JSON.parse(localStorage.getItem('token'))
    return x.User.name

  }

  // loginUser(user:User,cb:any){
  //   return this.http.post(`${this.url}/users/Login`,user)
  //   .subscribe(
  //     res =>{
  //       cb(this.tokenParser(res))
  //     },
  //     err=>{
  //       this.alert.error("Error fetching Data")
  //       cb(false)
  //     }
  //   )
  // }
  signup(user:any,cb:any){

    this.http.post(`${this.url}/users/signup`,user)
    .subscribe(
      res =>{
        cb(this.tokenParser(res))
      },
      err=>{
        // this.alert.error("Error fetching Data")
        cb(false)
      }
    )
  }
  tokenParser(payload:any){
    console.log(payload)
    if(payload.token){
      this.storeToken(payload)
      this.currentUserSubject.next(payload);
      // this.alert.success("Logged In")
      return true
    }
    else{
      if(payload.Status && payload.Status == 'false'){
        console.log(payload.Reason)
        // this.alert.error(payload.Reason)
        return false
      }
      else{
        // this.alert.error("Failed")
        return false
      }
    }
  }
  verifyUser(cb:any){
    this.http.get(`${this.url}/timeline/verifyUser`)
    .subscribe(
      res =>{
        cb(res)
      },
      err=>{
        // this.alert.error("Error fetching Data")
        cb(false)
      }
    )
  }
}