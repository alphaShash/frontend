import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../shared/models/todo.model';

@Injectable({ providedIn: 'root' })
export class AiApiService {

  private base = 'http://localhost:8080/api/ai';

  constructor(private http: HttpClient) {}

  generate(text: string) {
    return this.http.post<any[]>('http://localhost:8080/api/ai/generate', {
      input: text
    });
  }
}