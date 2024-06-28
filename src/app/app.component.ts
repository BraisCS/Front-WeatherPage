import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CityService } from './services/city.service';

interface City {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule] 
})
export class AppComponent implements OnInit {
  cities: City[] = [];
  weatherData: any = null;
  newCityName: string = '';

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe(
      data => {
        this.cities = data;
      },
      error => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  getWeather(city: string): void {
    this.cityService.getWeather(city).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  deleteCity(id: number): void {
    this.cityService.deleteCity(id).subscribe(
      response => {
        this.cities = this.cities.filter(city => city.id !== id);
      },
      error => {
        console.error('Error deleting city:', error);
      }
    );
  }

  createCity(): void {
    if (this.newCityName.trim()) {
      this.cityService.createCity(this.newCityName).subscribe(
        response => {
          this.cities.push({ id: response.id, name: this.newCityName });
          this.newCityName = '';
        },
        error => {
          console.error('Error creating city:', error);
        }
      );
    }
  }
}
