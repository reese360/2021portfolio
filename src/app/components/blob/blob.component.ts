import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-blob',
	templateUrl: './blob.component.html',
	styleUrls: ['./blob.component.scss'],
})
export class BlobControllerComponent implements AfterViewInit {
	blob!: Blob;
	hover: boolean = false;
	previousMousePoint = { x: 0, y: 0 };
	canvas!: HTMLCanvasElement;

	constructor() {}

	ngAfterViewInit(): void {
		this.canvas = document.getElementById('blobCanvas') as HTMLCanvasElement;
		this.canvas.setAttribute('touch-action', 'none');
		this.onWindowResize(); // set canvas dimensions

		this.blob = new Blob(this.canvas);
	}

	@HostListener('window:resize', ['$event']) onWindowResize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	@HostListener('document:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
		let pos = this.blob.center;
		let diff = { x: e.clientX - pos.x, y: e.clientY - pos.y };
		let dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
		let angle: number | null = null;
		this.blob.mousePos = { x: pos.x - e.clientX, y: pos.y - e.clientY };

		if (dist < this.blob.radius && this.hover === false) {
			let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
			angle = Math.atan2(vector.y, vector.x);
			this.hover = true;
		} else if (dist > this.blob.radius && this.hover === true) {
			let vector = { x: e.clientX - pos.x, y: e.clientY - pos.y };
			angle = Math.atan2(vector.y, vector.x);
			this.hover = false;
		}

		if (angle) {
			let nearestPoint: Point | null = null;
			let distanceFromPoint = 200;

			this.blob.points.forEach((point) => {
				if (Math.abs(angle! - point.azimuth) < distanceFromPoint) {
					nearestPoint = point;
					distanceFromPoint = Math.abs(angle! - point.azimuth);
				}
			});

			if (nearestPoint) {
				let strength = { x: this.previousMousePoint.x - e.clientX, y: this.previousMousePoint.y - e.clientY };
				let strengthRay = Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10;
				if (strengthRay > 100) strengthRay = 100;
				nearestPoint!.acceleration = (strengthRay / 100) * (this.hover ? -1 : 1);
			}
		}
		this.previousMousePoint = { x: e.clientX, y: e.clientY };
	}
}

class Blob {
	// credit to Liam Egan and his CodePen @ https://codepen.io/shubniggurath/pen/EmMzpp?editors=1111
	points: Point[];
	numPoints: number = 26;
	divisional: number = (Math.PI * 2) / this.numPoints;
	radius: number = 200;
	color: string = '#fa4361';

	mousePos: { x: number; y: number } = { x: 0, y: 0 };

	get center() {
		return { x: this.canvas.width * this.position.x, y: this.canvas.height * this.position.y };
	}

	private position: { x: number; y: number } = { x: 0.5, y: 0.5 };

	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		this.points = [];
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		for (let i = 0; i < this.numPoints; i++) {
			const point = new Point(this.divisional * (i + 1), this);
			this.points.push(point);
		}

		this.render();
	}

	render() {
		let pointArray = this.points;

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		pointArray[0].solveWidth(pointArray[this.numPoints - 1], pointArray[1]);
		let p0 = pointArray[this.numPoints - 1].position;
		let p1 = pointArray[0].position;
		let _p2 = p1;

		this.context.beginPath();
		this.context.moveTo(this.center.x, this.center.y);
		this.context.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);

		for (let i = 1; i < this.numPoints; i++) {
			pointArray[i].solveWidth(pointArray[i - 1], pointArray[i + 1] || pointArray[0]);
			let p2 = pointArray[i].position;
			let xc = (p1.x + p2.x) / 2;
			let yc = (p1.y + p2.y) / 2;

			this.context.quadraticCurveTo(p1.x, p1.y, xc, yc);

			this.context.fillStyle = this.color;

			p1 = p2;
		}

		let xc = (p1.x + _p2.x) / 2;
		let yc = (p1.y + _p2.y) / 2;
		this.context.quadraticCurveTo(p1.x, p1.y, xc, yc);

		this.context.fillStyle = this.color;
		this.context.fill();
		this.context.strokeStyle = this.color;

		requestAnimationFrame(this.render.bind(this));
	}
}

class Point {
	azimuth: number;
	_components: { x: number; y: number };
	_acceleration: number | undefined;
	_speed: number | undefined;
	_radialEffect: number | undefined;
	_elasticity: number | undefined;
	_friction: number | undefined;

	constructor(azimuth: number, private parent: Blob) {
		this.azimuth = Math.PI - azimuth;
		this._components = {
			x: Math.cos(this.azimuth),
			y: Math.sin(this.azimuth),
		};
		this.acceleration = -0.3 + Math.random() * 0.5;
	}

	solveWidth(leftPoint: Point, rightPoint: Point) {
		this.acceleration = (-0.3 * this.radialEffect + (leftPoint.radialEffect - this.radialEffect) + (rightPoint.radialEffect - this.radialEffect)) * this.elasticity - this.speed * this.friction;
	}

	get components() {
		return this._components;
	}

	set acceleration(value: number) {
		this._acceleration = value;
		this.speed += this._acceleration * 2;
	}

	get acceleration() {
		return this._acceleration || 0;
	}

	set speed(value: number) {
		this._speed = value;
		this.radialEffect += this._speed * 5;
	}

	get speed() {
		return this._speed || 0;
	}

	set radialEffect(value: number) {
		this._radialEffect = value;
	}

	get radialEffect() {
		return this._radialEffect || 0;
	}

	set elasticity(value) {
		this._elasticity = value;
	}
	get elasticity() {
		return this._elasticity || 0.0005;
	}

	set friction(value) {
		this._friction = value;
	}

	get friction() {
		return this._friction || 0.0085;
	}

	get position() {
		return {
			x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect),
			y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect),
		};
	}
}
