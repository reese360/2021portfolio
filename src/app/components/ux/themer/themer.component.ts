import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-themer',
	templateUrl: './themer.component.html',
	styleUrls: ['./themer.component.scss'],
})
export class ThemerComponent implements OnInit {
	@ViewChild('themerSvg') svg!: ElementRef;
	lightTheme: boolean = true;
	constructor() {}

	ngOnInit(): void {}

	toggleTheme(): void {
		this.lightTheme = !this.lightTheme;
		if (this.lightTheme) {
			const text = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
			const background = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
			document.documentElement.style.setProperty('--main-background-color', text);
			document.documentElement.style.setProperty('--text-color', background);
		} else {
			const text = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
			const background = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
			document.documentElement.style.setProperty('--main-background-color', text);
			document.documentElement.style.setProperty('--text-color', background);
		}
	}
}
