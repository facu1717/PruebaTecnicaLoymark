import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllUsers() {
    const url = `${this.baseUrl}user/getAllUsers`

    return new Promise((resolve, reject) => {

      this.http.get(url).subscribe(
        (resp ) => {
          resolve(resp)
        },
        (error) => {
          reject(error)
      })
    })
  }

  newUser(userData: User) {
    const url = `${this.baseUrl}user/newUser`

    return new Promise((resolve, reject) => {

      this.http.post(url, userData).subscribe(
        (resp) => {
          resolve(resp)
        },
        (error) => {
          reject(error)
      })
    })
  }

  updateUser(userData: User) {
    const url = `${this.baseUrl}user/updateUser`

    return new Promise((resolve, reject) => {

      this.http.put(url, userData).subscribe(
        (resp) => {
          resolve(resp)
        },
        (error) => {
          reject(error)
      })
    })
  }

  deleteUser(idUser: number) {
    const url = `${this.baseUrl}user/deleteUser?idUser=${idUser}`

    return new Promise((resolve, reject) => {

      this.http.delete(url).subscribe(
        (resp) => {
          resolve(resp)
        },
        (error) => {
          reject(error)
      })
    })
  }
}
