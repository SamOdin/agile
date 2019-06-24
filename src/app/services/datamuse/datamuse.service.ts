import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DatamuseService {
  constructor(
      private readonly http: HttpClient
  ) {}

  setChat (param: string): Promise<any> {
    return this.http.get<any>(`words?ml=${param}`).toPromise().then((res) => {
      return [...res];
    });
  }
}
