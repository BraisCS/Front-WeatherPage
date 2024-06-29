import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CityService } from './services/city.service';

interface City {
  id: number;
  name: string;
  weatherData?: any; // Añadir esta propiedad opcional
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
  newCityName: string = '';
  title = "El tiempo"

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.getCities().subscribe(
      data => {
        this.cities = data;
        this.cities.forEach(city => this.getWeather(city));
      },
      error => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  getWeather(city: City): void {
    this.cityService.getWeather(city.name).subscribe(
      data => {
        city.weatherData = data;
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  deleteCity(id: number): void {
    this.cityService.deleteCity(id).subscribe(
      response => {
        console.log(response.message);
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
          console.log(response.message);
          const newCity: City = { id: response.id, name: this.newCityName };
          this.cities.push(newCity);
          this.newCityName = '';
          this.getWeather(newCity); // Obtener el clima para la nueva ciudad
        },
        error => {
          console.error('Error creating city:', error);
        }
      );
    }
  }
}
