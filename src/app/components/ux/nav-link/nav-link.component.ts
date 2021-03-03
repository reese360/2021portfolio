import { trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-nav-link',
	templateUrl: './nav-link.component.html',
	styleUrls: ['./nav-link.component.scss'],
})
export class NavLinkComponent implements AfterViewInit {
	@Input() displayText!: string;
	@ViewChild('blockEl') blockEl!: ElementRef;

	animating: boolean = false;
	requestStart: boolean = false;
	requestEnd: boolean = false;

	constructor(private renderer: Renderer2) {}

	ngAfterViewInit(): void {
		this.blockEl.nativeElement.addEventListener(
			'animationstart',
			() => {
				this.animating = true;
				if (this.requestStart) {
					this.triggerStartAnimations();
					this.requestStart = false;
				}
				if (this.requestEnd) {
					this.triggerEndAnimations();
					this.requestEnd = false;
				}
			},
			false
		);

		this.blockEl.nativeElement.addEventListener(
			'animationend',
			() => {
				this.animating = false;
				if (this.requestStart) {
					this.triggerStartAnimations();
					this.requestStart = false;
				}
				if (this.requestEnd) {
					this.triggerEndAnimations();
					this.requestEnd = false;
				}
			},
			false
		);
	}

	triggerStartAnimations(): void {
		this.renderer.removeClass(this.blockEl.nativeElement, 'block-exit');
		this.renderer.addClass(this.blockEl.nativeElement, 'block-enter');
	}

	triggerEndAnimations(): void {
		this.renderer.removeClass(this.blockEl.nativeElement, 'block-enter');
		this.renderer.addClass(this.blockEl.nativeElement, 'block-exit');
	}

	@HostListener('mouseenter', ['$event']) onMouseEnter(e: MouseEvent) {
		if (this.animating) this.requestStart = true;
		else this.triggerStartAnimations();
	}
	@HostListener('mouseleave', ['$event']) onMouseOut(e: MouseEvent) {
		if (this.animating) this.requestEnd = true;
		else this.triggerEndAnimations();
	}

	clicked(obj: any) {
		console.log(obj);
	}
}
