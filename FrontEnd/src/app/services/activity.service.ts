import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private baseUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getAllActivities() {
    const url = `${this.baseUrl}activity/getAllActivities`

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
}
