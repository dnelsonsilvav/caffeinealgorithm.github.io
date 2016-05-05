PW.Behaviors = (function () {
	let FallBehavior = function FallBehavior() {};
	FallBehavior.prototype.update = function update(entity) {
		entity.vy += 0.2;
		entity.transform.move(0, entity.vy);
	};

	let BulletSpeedBehavior = function BulletSpeedBehavior() { this.direction = 'right'; };
	BulletSpeedBehavior.prototype.update = function update(entity) { if (this.direction === 'right') entity.transform.move(entity.vx++, 0); };

	let FollowMouseBehavior = function FollowMouseBehavior() {};
	FollowMouseBehavior.prototype.update = function update(entity) {
		entity.transform.lookAt(PW.input.mouse.x - entity.width / 2, PW.input.mouse.y - entity.height / 2);
		entity.transform.moveHeading();
	};

	let RotateMoveBehavior = function RotateBehavior() {};
	RotateMoveBehavior.prototype.update = function update(entity) {
		if (PW.input.isDown(39)) entity.transform.rotate(++entity.transform.rotation);
		if (PW.input.isDown(37)) entity.transform.rotate(--entity.transform.rotation);
		if (PW.input.isDown(38)) entity.transform.moveHeading();
	};

	return {
		Fall: FallBehavior,
		BulletSpeed: BulletSpeedBehavior,
		FollowMouse: FollowMouseBehavior,
		RotateMove: RotateMoveBehavior
	};
}());