import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { WeatherService } from './services/weatherService.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [WeatherService],
})
export class AppComponent {
	cursorHover: boolean = false;
	constructor(private render: Renderer2) {}
	@ViewChild('cursor') cursorBlock!: ElementRef;

	@HostListener('contextmenu', ['$event']) onRightClick(e: any) {
		e.preventDefault();
	}

	@HostListener('document:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
		// this.cursorBlock.nativeElement.style.left = `${e.clientX - 5}px`;
		// this.cursorBlock.nativeElement.style.top = `${e.clientY - 5}px`;
		// const query = document.querySelectorAll('.link-container:hover')[0];
		// this.cursorHover = query ? true : false;
		// if (this.cursorHover) {
		// 	this.render.addClass(this.cursorBlock.nativeElement, 'cursor-hl');
		// 	this.cursorBlock.nativeElement.style.left = `${e.clientX - 15}px`;
		// 	this.cursorBlock.nativeElement.style.top = `${e.clientY - 15}px`;
		// 	this.cursorHover = true;
		// } else {
		// 	this.render.removeClass(this.cursorBlock.nativeElement, 'cursor-hl');
		// }
	}

	@HostListener('document:mousedown', ['$evetn']) onMouseDown(e: MouseEvent) {}

	// @HostListener('mousewheel', ['$event']) onMousewheel(event: any) {
	// 	// scroll up
	// 	if (event.wheelDelta > 0) {
	// 		const text = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
	// 		const background = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
	// 		document.documentElement.style.setProperty('--main-background-color', text);
	// 		document.documentElement.style.setProperty('--text-color', background);
	// 	}

	// 	// scroll down
	// 	if (event.wheelDelta < 0) {
	// 		const text = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
	// 		const background = getComputedStyle(document.documentElement).getPropertyValue('--main-background-color');
	// 		document.documentElement.style.setProperty('--main-background-color', text);
	// 		document.documentElement.style.setProperty('--text-color', background);
	// 	}
	// }
}
