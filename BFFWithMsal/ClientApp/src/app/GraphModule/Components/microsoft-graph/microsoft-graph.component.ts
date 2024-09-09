import { Component } from '@angular/core';
import { LearningItem } from '../../Model/learning-item';
import { MicrosoftGraphService } from '../../Services/microsoft-graph.service';

@Component({
  selector: 'app-microsoft-graph',
  templateUrl: './microsoft-graph.component.html',
  styleUrls: ['./microsoft-graph.component.css']
})
export class MicrosoftGraphComponent {

  learningData: LearningItem[] = [];
  constructor(private _microsoftGraphService:MicrosoftGraphService){}
  
  ngOnInit(): void {
    this._microsoftGraphService.GetData().subscribe({
      next: (response: LearningItem[]) => {
        this.learningData = response; // تخزين البيانات لعرضها
      },
      error: (error) => {
        console.error('Error fetching Viva Learning data: ', error); // التعامل مع الخطأ
      }
    });
  }

}
