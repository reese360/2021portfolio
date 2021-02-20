import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-landing-view',
	templateUrl: './landing-view.component.html',
	styleUrls: ['./landing-view.component.scss'],
})
export class LandingViewComponent implements AfterViewInit {
	constructor() {}

	ngAfterViewInit(): void {}

	@HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent): void {
		console.log(true);
		const elements: Element[] = Array.from(document.getElementsByClassName('text-enter'));
		elements.forEach((el: Element) => {
			el.classList.remove('text-enter');
			el.classList.add('text-exit');
		});
	}
}
