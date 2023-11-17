import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface CorrectionResponse {
  text: string
}

@Injectable()
export class ApiHttpService {
  private apiUrl = 'http://localhost:4200';

  constructor(
    private http: HttpClient
  ) { }

  public getCorrectedText(text: string) {
    return firstValueFrom(this.http.post<CorrectionResponse>(`${this.apiUrl}/api/correct`, { text }));
  }
}
