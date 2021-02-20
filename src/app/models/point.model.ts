import { Blob } from './blob.model';
export class Point {
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
