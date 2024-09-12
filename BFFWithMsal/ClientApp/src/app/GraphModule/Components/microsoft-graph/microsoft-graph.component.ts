import { Component } from '@angular/core';
import { LearningItem } from '../../Model/learning-item';
import { MicrosoftGraphService } from '../../Services/microsoft-graph.service';
import { User } from '../../Model/user';
import { Course } from '../../Model/course';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-microsoft-graph',
  templateUrl: './microsoft-graph.component.html',
  styleUrls: ['./microsoft-graph.component.css']
})
export class MicrosoftGraphComponent {

  weatherData:any=[];


  learningData:any;
  constructor(private _microsoftGraphService:MicrosoftGraphService,private weatherService :WeatherService){}
  
  ngOnInit(): void {
  this.GetWeather();
  this.GetUsers();
   }

   GetWeather()
   {
     this._microsoftGraphService.GetWeather().subscribe(res=>{
       this.weatherData=res;
       console.log(res);
     },err=>{
       console.log(err);
 
     })
   }
  // GetData(){
  //   this.weatherService.GetData().subscribe({
  //     next: (response ) => {
  //       this.learningData = response; // تخزين البيانات لعرضها
  //     },
  //     error: (error) => {
  //       console.error('Error fetching Viva Learning data: ', error); // التعامل مع الخطأ
  //     }
  //   });
  // }

  GetUsers(){
    this._microsoftGraphService.GetUsers().subscribe({
      next: (users: User[]) => {
        console.log('Users:', users);
        // هنا يمكنك التعامل مع بيانات المستخدمين
      },
      error: (error) => {
        console.error('Error fetching user data: ', error);
      }
    });
  }

  // GetCourses(){
  //   this._microsoftGraphService.GetCourses().subscribe({
  //     next: (courses: Course[]) => {
  //       console.log('Courses:', courses);
  //       // هنا يمكنك التعامل مع بيانات الدورات
  //     },
  //     error: (error) => {
  //       console.error('Error fetching course data: ', error);
  //     }
  //   });
  // }
}
