import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LearningItem } from '../GraphModule/Model/learning-item';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 


constructor(private http:HttpClient) { }



  GetWeather()
  {
    
    return this.http.get(environment.apiURl+"WeatherForecast")
  }

}
