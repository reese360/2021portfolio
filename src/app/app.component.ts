import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	@ViewChild('cursor') cursorBlock!: ElementRef;

	@HostListener('contextmenu', ['$event']) onRightClick(e: any) {
		e.preventDefault();
	}

	@HostListener('document:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
		this.cursorBlock.nativeElement.style.left = `${e.clientX - 5}px`;
		this.cursorBlock.nativeElement.style.top = `${e.clientY - 5}px`;
	}
}
