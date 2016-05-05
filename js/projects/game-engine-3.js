(function (Behaviors, Circle, Game, Scene, Sprite) {
	function init() {
		let game = new Game();
		let scene = new Scene();
		let sprite = new Sprite('sprite', 'http://caffeinealgorithm.com/img/gth.png', 10, 10);

		sprite.addBehavior(new Behaviors.Fall());
		// sprite.addBehavior(new Behaviors.BulletSpeed());
		// sprite.addBehavior(new Behaviors.FollowMouse());
		// sprite.addBehavior(new Behaviors.RotateMove());
		scene.add(sprite);
		game.add(scene);
		game.start();
	};

	document.addEventListener('DOMContentLoaded', init, false);
}(PW.Behaviors, PW.Circle, PW.Game, PW.Scene, PW.Sprite));