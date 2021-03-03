import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
	private _apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather?q=nashville,tennessee&appid=fab50f0feed193501315cd87f121183d';
	constructor(private httpClient: HttpClient) {}

	public getLocalWeather() {
		return this.httpClient.get(this._apiUrl);
	}
}
