import { Point } from './point.model';
export class Blob {
	// special thanks to Liam Egan and his CodePen @ https://codepen.io/shubniggurath/pen/EmMzpp?editors=1111
	points: Point[];
	numPoints: number = 26;
	divisional: number = (Math.PI * 2) / this.numPoints;
	color: string = getComputedStyle(document.documentElement).getPropertyValue('--theme-color');
	targetRadius: number = this.radius; // target value for radius to adjust to
	step: number = 1; // step for increasing or decreasing blob radius;
	mousePos: { x: number; y: number } = { x: 0, y: 0 };
	private position: { x: number; y: number } = { x: 0.5, y: 0.5 };
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	public get center() {
		return { x: this.canvas.width * this.position.x, y: this.canvas.height * this.position.y };
	}

	constructor(canvas: HTMLCanvasElement, public radius: number) {
		this.points = [];
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		for (let i = 0; i < this.numPoints; i++) {
			const point = new Point(this.divisional * (i + 1), this);
			this.points.push(point);
		}

		this.render();
	}

	resizeBlobRadius(targetSize: number, step: number = 1): void {
		this.targetRadius = targetSize;
		this.step = step;
	}

	render() {
		// readjust the blob radius by step to target radius every loop
		if (this.radius != this.targetRadius) {
			if (this.radius > this.targetRadius) this.radius -= this.step;
			else this.radius += this.step;
		}

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
