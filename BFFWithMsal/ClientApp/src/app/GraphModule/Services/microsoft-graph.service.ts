import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningItem } from '../Model/learning-item';
import { MsalService } from '@azure/msal-angular';
import { User } from '../Model/user';
import { Course } from '../Model/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftGraphService {

   
  private apiUrlUsers = 'https://graph.microsoft.com/v1.0/users'; 
  private apiUrlCourses = 'https://graph.microsoft.com/v1.0/users'; 

 
  constructor(private http: HttpClient,private authService: MsalService) { }

   
  GetWeather()
  {
    
    return this.http.get(environment.apiURl+"WeatherForecast")
  }
  GetUsers(): Observable<User[]> {
       var token=sessionStorage.getItem("accessToken");
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>(this.apiUrlUsers ,{headers});
  }

  // GetData()  {
  //   // var token=sessionStorage.getItem("accessToken");
  //   // console.log(token)
  //   // const headers = new HttpHeaders({
  //   //   'Authorization': `Bearer ${token}`
  //   // });

  //   return this.http.get(this.apiUrl);//,{headers:headers}
  // }


  GetCourses(): Observable<Course[]> {
   
    return this.http.get<Course[]>(this.apiUrlCourses );
  }
}
