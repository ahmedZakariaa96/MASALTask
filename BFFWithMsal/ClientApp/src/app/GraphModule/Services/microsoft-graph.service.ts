import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningItem } from '../Model/learning-item';
import { MsalService } from '@azure/msal-angular';
import { User } from '../Model/user';
import { Course } from '../Model/course';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftGraphService {

  private apiUrl = 'https://graph.microsoft.com/v1.0/me';
  private apiUrlUsers = 'https://graph.microsoft.com/v1.0/education/users'; 
  private apiUrlCourses = 'https://graph.microsoft.com/v1.0/education/classes';

  constructor(private http: HttpClient,private authService: MsalService) { }

  GetData(): Observable<LearningItem[]> {
    var token=sessionStorage.getItem("accessToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<LearningItem[]>(this.apiUrl,{ headers });
  }

  GetUsers(): Observable<User[]> {
    var token = sessionStorage.getItem("accessToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>(this.apiUrlUsers, { headers });
  }

  GetCourses(): Observable<Course[]> {
    var token = sessionStorage.getItem("accessToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Course[]>(this.apiUrlCourses, { headers });
  }
}
