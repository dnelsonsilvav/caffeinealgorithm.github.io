// Global variables
var colors = ['#FF4500', '#FF8C00', '#7FFF00', '#00BFFF', '#9932CC'];
var color =  { 'snake': '', 'food': '' };
var milliseconds = 50;
var speed = 50;
var size = 10;

// Check if the browser supports the 'canvas' tag
function support () {
	// Get canvas data by id
	canvas = document.getElementById('base');
	// Get the context of canvas
	context = canvas.getContext('2d');
	// Start the game
	start();
}

// Start the game and initialize variables
function start () {
	// Snake body array
	nsisadev = [];

	// Snake length
	length = 5;

	// Snake position
	currentPoint = { 'x': 250, 'y': 250 };

	// Snake direction
	direction = 'right';

	// Snake color
	color['snake'] = '#777';

	// Point array
	point = [];

	// Clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Set food eaten
	setFoodEaten();

	// Draw snake
	snake();

	// Draw food
	food();

	// Timer to control the movement and the movement speed
	timer = setInterval(function() { move(direction) }, milliseconds);

	// Not paused flag
	isPaused = false;

	// Set status
	setStatus('Started, you can pause the game by pressing P.');
}

// Set food eaten value on html
function setFoodEaten() { document.getElementById('foodEaten').innerText = length - 5; }

// Set speed on html
function setSpeed() {
	// Stop time
	clearInterval(timer);

	// Initialize time
	timer = setInterval(function() { move(direction) }, milliseconds);
	document.getElementById('milliseconds').innerText = speed;
}

// Set status on html
function setStatus(status) { document.getElementById('status').innerText = status; }

// Draw snake
function snake() {
	// End the game if the snake eat herself.
	if (nsisadev.some(eaten)) {
		// End the game
		end();

		// Return zero
		return 0;
	}

	// Push the snake body
	nsisadev.push([currentPoint['x'], currentPoint['y']]);

	// Set snake color
	context.fillStyle = color['snake'];

	// Set snake position and size
	context.fillRect(currentPoint['x'], currentPoint['y'], size, size);

	// Manage the movement and remove the last snake body part
	if (nsisadev.length > length) {
		body = nsisadev.shift();

		// Remove last body part
		context.clearRect(body[0], body[1], size, size);
	}

	// Change snake color and create another food
	if (currentPoint['x'] == point['x'] && currentPoint['y'] == point['y']) {
		// Set snake color
		color['snake'] = color['food'];

		// Increase snake length
		length++;

		// Set food eaten
		setFoodEaten();

		// Draw food
		food();
	}
}

// Verify if the snake eat herself
function eaten(insd) { return (insd[0] == currentPoint['x'] && insd[1] == currentPoint['y']); }

// Draw food
function food() {
	// Set point (food random position)
	point = { 'x': Math.floor(Math.random() * (canvas.width / size)) * size, 
			  'y': Math.floor(Math.random() * (canvas.height / size)) * size };

	// Draw food
	if (nsisadev.some(pointer)) { food(); }
	else {
		// Set random color
		color['food'] = colors[Math.floor(Math.random() * colors.length)];

		// Set food color
		context.fillStyle = color['food'];

		// Set food position and size
		context.fillRect(point['x'], point['y'], size, size);
	}
}

// Verify and compare snake and food position
function pointer(insd) { return (insd[0] == point['x'] && insd[1] == point['y']); }

// Keydown event
document.onkeydown = function(event) {
	// Get key code
	var keyCode = window.event.keyCode;

	// A and left key to move the snake
	if (keyCode == 37 || keyCode == 65) {
		if (direction != 'right' && isPaused == false) { move('left'); }
	}
	// W and up key to move the snake
	else if (keyCode == 38 || keyCode == 87) {
		if (direction != 'down' && isPaused == false) { move('up'); }
	}
	// D and right key to move snake
	else if (keyCode == 39 || keyCode == 68) {
		if (direction != 'left' && isPaused == false) { move('right'); }
	}
	// S and down key to move snake
	else if (keyCode == 40 || keyCode == 83) {
		if (direction != 'up' && isPaused == false) { move('down'); }
	}
	// R key to restart the game
	else if (keyCode == 82) {
		clearInterval(timer);
		isPaused = true;
		start();
	}
	// + key to increase the snake speed
	else if (keyCode == 187 && isPaused == false) {
		milliseconds -= 5;
		speed += 5;
		setSpeed();
	}
	// - key to decrease the snake speed
	else if (keyCode == 189 && isPaused == false) {
		milliseconds += 5;
		speed -= 5;
		setSpeed();
	}
	// P key to pause and continue the game
	else if (keyCode == 80) {
		// Continue the game
		if (isPaused == true) {
			timer = setInterval(function() { move(this.direction) }, milliseconds);
			isPaused = false;
			setStatus('Continued, you can pause the game by pressing P.');
		}
		// Pause the game
		else {
			clearInterval(timer);
			isPaused = true;
			setStatus('Paused, you can continue the game by pressing P.');
		}
	}
}

// Move the snake to recieved direction
function move(direction) {
	// Move left
	if (direction == 'left') {
		if (position(direction) >= 0) { execute(direction, 'x', position(direction)); }
		// End the game
		else { end(); }
	}
	// Move up
	else if (direction == 'up') {
		if (position(direction) >= 0) { execute(direction, 'y', position(direction)); }
		// End the game
		else { end(); }
	}
	// Move right
	else if (direction == 'right') {
		if (position(direction) < canvas.width) { execute(direction, 'x', position(direction)); }
		// End the game
		else { end(); }
	}
	// Move down
	else if (direction == 'down') {
		if (position(direction) < canvas.height) { execute(direction, 'y', position(direction)); }
		// End the game
		else { end(); }
	}
}

// Return new position by direction
function position(direction) {
	// If direction is left subtract axis (x) and size
	if (direction == 'left') { newPosition = currentPoint['x'] - size; }

	// If direction is left subtract axis (y) and size
	else if (direction == 'up') { newPosition = currentPoint['y'] - size; }

	// If direction is left add axis (x) and size
	else if (direction == 'right') { newPosition = currentPoint['x'] + size; }

	// If direction is left add axis (y) and size
	else if (direction == 'down') { newPosition = currentPoint['y'] + size; }

	// Return the new position
	return newPosition;
}

// Execute the move
function execute(direction, axis, value) {
	// Set direction (global variable)
	this.direction = direction;

	// Set axis value
	currentPoint[axis] = value;

	// Draw snake
	snake();
}

// End the game
function end() {
	// Stop time
	clearInterval(timer);

	// Paused flag
	isPaused = true;

	// Set status
	setStatus('Ended, you can restart the game by pressing R.');
}