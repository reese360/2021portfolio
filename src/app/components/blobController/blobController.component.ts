import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Blob } from '../../models/blob.model';
import { Point } from '../../models/point.model';

enum BlobPosition {
	TOP = 0,
	BOTTOM = 2,
	LEFT = 3,
	RIGHT = 4,
	CENTER = 5,
}

@Component({
	selector: 'app-blobController',
	templateUrl: './blobController.component.html',
	styleUrls: ['./blobController.component.scss'],
})
export class BlobControllerComponent implements AfterViewInit {
	blob!: Blob;
	// blobRadius: number = 350;
	blobRadius: number = Math.round(window.innerHeight / 2.5);
	hover: boolean = false;
	hoverTimer: number = 0;
	lastMousePoint = { x: 0, y: 0 };
	canvas!: HTMLCanvasElement;
	inFocus: boolean = true;

	blobPosition: BlobPosition;

	constructor() {
		this.blobPosition = BlobPosition.CENTER;
	}

	ngAfterViewInit(): void {
		console.log(this.blobRadius);
		this.canvas = document.getElementById('blobCanvas') as HTMLCanvasElement;
		this.canvas.setAttribute('touch-action', 'none');
		this.onWindowResize(); // set canvas dimensions

		this.blob = new Blob(this.canvas, this.blobRadius);

		// if no mouseover for > 2 seconds => random movements
		setInterval(() => {
			this.hoverTimer++; // increment hoverTimer every second

			// if (this.hoverTimer > 3 && this.inFocus) {
			if (this.hoverTimer > 2) {
				// if (this.hoverTimer > 1 && this.blob.requestFrame) {
				// random entry vector
				let angle = Math.random() * Math.PI * 2; // random angle
				let x = Math.cos(angle) * this.blob.radius + this.blob.center.x;
				let y = Math.sin(angle) * this.blob.radius + this.blob.center.y;
				this.animateBlob({ x: x, y: y });

				// random exit vector
				angle = Math.random() * Math.PI * 2; // random angle
				x = Math.cos(angle) * this.blob.radius + this.blob.center.x;
				y = Math.sin(angle) * this.blob.radius + this.blob.center.y;
				this.animateBlob({ x, y });

				// this.hoverTimer = 0;
			}
		}, 1000);
	}

	@HostListener('window:focus', ['$event']) onFocus(event: any): void {
		this.inFocus = true;
	}

	@HostListener('window:blur', ['$event']) onBlur(event: any): void {
		this.inFocus = false;
	}

	@HostListener('window:resize', ['$event']) onWindowResize(): void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	@HostListener('document:mousedown', ['$event']) onMouseDown(e: MouseEvent): void {}

	@HostListener('document:mousemove', ['$event']) onMouseMove(e: MouseEvent): void {
		this.animateBlob({ x: e.clientX, y: e.clientY });
	}

	animateBlob(e: { x: number; y: number }): void {
		let pos = this.blob.center;
		let diff = { x: e.x - pos.x, y: e.y - pos.y };
		let dist = Math.round(Math.sqrt(diff.x * diff.x + diff.y * diff.y));
		let angle: number | null = null;
		this.blob.mousePos = { x: pos.x - e.x, y: pos.y - e.y };

		if (dist <= this.blob.radius && this.hover === false) {
			// entry vector
			let vector = { x: e.x - pos.x, y: e.y - pos.y };
			angle = Math.atan2(vector.y, vector.x);
			this.hover = true;
		} else if (dist >= this.blob.radius && this.hover === true) {
			// exit vector
			let vector = { x: e.x - pos.x, y: e.y - pos.y };
			angle = Math.atan2(vector.y, vector.x);
			this.hover = false;
			// this.hoverTimer = 0; // restart timer at 0
		}

		if (angle) {
			let nearestPoint: Point | null = null;
			let distanceFromPoint = this.blobRadius;

			this.blob.points.forEach((point) => {
				if (Math.abs(angle! - point.azimuth) < distanceFromPoint) {
					nearestPoint = point;
					distanceFromPoint = Math.abs(angle! - point.azimuth);
				}
			});

			if (nearestPoint) {
				let strength = { x: this.lastMousePoint.x - e.x, y: this.lastMousePoint.y - e.y };
				let strengthRay = Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 20;
				if (strengthRay > 100) strengthRay = 100;
				nearestPoint!.acceleration = (strengthRay / 100) * (this.hover ? -1 : 1);
			}
		}
		this.lastMousePoint = { x: e.x, y: e.y };
	}
}
