Math.radians = function radians(degrees) { return degrees * Math.PI / 180; };
Math.degrees = function degrees(radians) { return radians * 180 / Math.PI; };

window.PW = (function () {
	let inherit = function inherit(destiny, source) {
		destiny.prototype = Object.create(source.prototype);
		destiny.prototype.constructor = destiny;
	};

	let input = {
		keys: {},
		mouse: { x: 0, y: 0 },

		start: function start() {
			document.addEventListener('keydown', function (e) { this.keys[e.keyCode] = true; }.bind(this), false);
			document.addEventListener('keyup', function (e) { delete this.keys[e.keyCode]; }.bind(this), false);
			document.addEventListener('mousemove', function (e) {
				this.mouse.x = e.clientX;
				this.mouse.y = e.clientY;
			}.bind(this), false);
		},

		isDown: function isDown(key) { return key in this.keys; }
	};

	let viewPort = {};

	let CanvasRenderer = function CanvasRenderer() {
		this.element = document.querySelector('canvas');
		this.context = this.element.getContext('2d');
		this.element.width = window.innerWidth;
		this.element.height = window.innerHeight;

		viewPort.width = this.element.width;
		viewPort.height = this.element.height;
	};

	let Game = function Game() {
		this.lastTime = this.delta = 0;
		this.timestep = 1000 / 60;
		this.scenes = [];
		this.renderer = new CanvasRenderer();
	};

	Game.dt = 0;

	Game.prototype.add = function add(scene) { this.scenes.push(scene); };
	Game.prototype.update = function update(dt) { this.scenes.forEach(function (scene) { scene.update(dt); }); };

	Game.prototype.render = function render() {
		let context = this.renderer.context;
		let element = this.renderer.element;

		context.clearRect(0, 0, element.width, element.height);
		this.scenes.forEach(function (scene) { scene.render(this.renderer); }, this);
	};

	Game.prototype.start = function start() {
		input.start();
		window.requestAnimationFrame(function (timestamp) {
			this.render();
			this.lastTime = timestamp;
			window.requestAnimationFrame(this.loop.bind(this));
		}.bind(this));
	};

	Game.prototype.loop = function loop(timestamp) {
		this.delta += timestamp - this.lastTime;
		this.lastTime = timestamp;

		Game.dt = this.delta;
		while (this.delta >= this.timestep) {
			this.update(this.delta);
			this.delta -= this.timestep;
		}

		this.render();
		window.requestAnimationFrame(this.loop.bind(this));
	};

	let Position = function Position(x, y) { this.x = x; this.y = y; };

	let Transform = function Transform() {
		this.position = new Position(0, 0);
		this.rotation = this.size = this.angle = 0;
	};

	Transform.prototype.move = function move(x, y) {
		this.position.x += x;
		this.position.y += y;
	};

	Transform.prototype.moveHeading = function moveHeading() {
		this.position.x += Math.cos(this.angle);
		this.position.y += Math.sin(this.angle);
	};

	Transform.prototype.rotate = function rotate(angle) {
		let radians = Math.radians(angle);
		this.angle = radians;
		this.rotation = angle;
	};

	Transform.prototype.lookAt = function lookAt(x, y) {
		let distX = x - this.position.x;
		let distY = y - this.position.y;
		let angle = Math.atan2(distY, distX);

		if (Math.round(distX) !== 0 && Math.round(distY) !== 0) this.rotate(angle * 180 / Math.PI);
	};

	let Scene = function Scene() { this.entities = []; };

	Scene.prototype.add = function add(entity) { this.entities.push(entity); };
	Scene.prototype.update = function update(dt) { this.entities.forEach(function (entity) { entity.update(dt); }); };
	Scene.prototype.render = function render(renderer) { this.entities.forEach(function (entity) { entity.render(renderer); }); };

	let Entity = function Entity(name, x, y) {
		this.name = name;
		this.behaviors = [];
		this.vx = this.vy = 5;
		this.transform = new Transform();
		this.transform.position = new Position(x, y);
	};

	Entity.prototype.addBehavior = function addBehavior(behavior) { this.behaviors.push(behavior); };

	Entity.prototype.update = function update() { this.behaviors.forEach(function (behavior) { behavior.update(this); }, this); };

	let Sprite = function Sprite(name, source, x, y) {
		Entity.call(this, name, x, y);

		this.image = new Image();
		this.image.src = source;
		this.width = this.image.width;
		this.height = this.image.height;
	};

	inherit(Sprite, Entity);

	Sprite.prototype.render = function render(renderer) { this.rotate(renderer); };

	Sprite.prototype.rotate = function rotate(renderer) {
		let posX = this.transform.position.x + this.image.width / 2;
		let posY = this.transform.position.y + this.image.height / 2;
		renderer.context.save();
		renderer.context.translate(posX, posY);
		renderer.context.rotate(this.transform.angle);
		renderer.context.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
		renderer.context.restore();
	};

	Sprite.prototype.update = function update(delta) { this.behaviors.forEach(function (behavior) { behavior.update(this, delta); }, this); };

	let Circle = function Circle(x, y) {
		Entity.call(this, 'circle', x, y);
		this.size = 10;
		this.width = this.height = this.size;
	};

	inherit(Circle, Entity);

	Circle.prototype.render = function render(renderer) {
		renderer.context.beginPath();
		renderer.context.arc(
		this.transform.position.x, this.transform.position.y, this.size, 0, Math.PI * 2);
		renderer.context.fill();
	};

	return {
		inherit: inherit,
		input: input,
		viewPort: viewPort,
		Game: Game,
		Position: Position,
		Transform: Transform,
		Scene: Scene,
		Entity: Entity,
		Sprite: Sprite,
		Circle: Circle
	};
}());