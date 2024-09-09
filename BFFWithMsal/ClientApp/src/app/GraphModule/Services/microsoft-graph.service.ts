import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningItem } from '../Model/learning-item';

@Injectable({
  providedIn: 'root'
})
export class MicrosoftGraphService {

  private apiUrl = 'https://graph.microsoft.com/v1.0/solutions/vivaLearning/learningProviders';

  constructor(private http: HttpClient) { }

  GetData(): Observable<LearningItem[]> {
    return this.http.get<LearningItem[]>(this.apiUrl);
  }
}
