import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule, CommonModule], // Importa los módulos necesarios
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weather: any;
  city: string = 'Villa Carlos Paz'; // Ciudad fija
  private apiKey = '18b3fd689f420718af0f983648d95850'; // Reemplaza con tu clave de API de OpenWeatherMap
  weatherIconUrl: string = ''; // URL del ícono de clima

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeather(); // Llamamos a la función para cargar el clima al iniciar
  }

  // Método para obtener los datos del clima de Villa Carlos Paz
  getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=es`;
    this.http.get(url).subscribe(
      (data) => {
        this.weather = data; // Guardamos los datos del clima
        this.setWeatherIcon(this.weather.weather[0].icon); // Usamos el icono desde la API
        console.log(this.weather); // Puedes eliminar esta línea si no deseas ver los datos en consola
      },
      (error) => {
        console.error('Error al obtener los datos del clima:', error); // Manejamos el error en caso de que ocurra
      }
    );
  }

  // Método para establecer el ícono de clima
  setWeatherIcon(iconCode: string) {
    this.weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // Construir la URL para el ícono
  }
}