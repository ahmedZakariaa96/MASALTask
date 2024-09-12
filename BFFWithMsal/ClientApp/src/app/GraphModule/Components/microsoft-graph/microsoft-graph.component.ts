import { Component } from '@angular/core';
import { LearningItem } from '../../Model/learning-item';
import { MicrosoftGraphService } from '../../Services/microsoft-graph.service';
import { User } from '../../Model/user';
import { Course } from '../../Model/course';

@Component({
  selector: 'app-microsoft-graph',
  templateUrl: './microsoft-graph.component.html',
  styleUrls: ['./microsoft-graph.component.css']
})
export class MicrosoftGraphComponent {

  

  learningData: LearningItem[] = [];
  constructor(private _microsoftGraphService:MicrosoftGraphService){}
  
  ngOnInit(): void {
  this.GetData();
  this.GetUsers();
  this.GetCourses();
  }


  GetData(){
    this._microsoftGraphService.GetData().subscribe({
      next: (response: LearningItem[]) => {
        this.learningData = response; // تخزين البيانات لعرضها
      },
      error: (error) => {
        console.error('Error fetching Viva Learning data: ', error); // التعامل مع الخطأ
      }
    });
  }

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

  GetCourses(){
    this._microsoftGraphService.GetCourses().subscribe({
      next: (courses: Course[]) => {
        console.log('Courses:', courses);
        // هنا يمكنك التعامل مع بيانات الدورات
      },
      error: (error) => {
        console.error('Error fetching course data: ', error);
      }
    });
  }
}
