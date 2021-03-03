import { AfterViewInit, Component, HostListener } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherService.service';

@Component({
	selector: 'app-landing-view',
	templateUrl: './landing-view.component.html',
	styleUrls: ['./landing-view.component.scss'],
})
export class LandingViewComponent implements AfterViewInit {
	localTemp: number = 0;
	localUTC: number = 0;
	constructor(private weatherSvc: WeatherService) {}

	ngAfterViewInit(): void {
		this.weatherSvc.getLocalWeather().subscribe((data: any) => {
			console.log(data);
			this.localTemp = Math.round(data.main.temp * (9 / 5) - 459.67);
			this.localUTC = data.dt;
		});
	}
}
