import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface City {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'https://weatherback-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weather/${city}`);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  createCity(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, { name });
  }
}
