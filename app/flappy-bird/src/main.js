import kaboom from 'kaboom'
console.log('help')
const k = kaboom()

loadSprite('bird', 'sprites/bird.png')
loadSprite('bg', 'sprites/bg.png')
loadSprite('pipe', 'sprites/pipe.png')
loadSound('flap', 'sounds/flap.mp3')

let score = 0
let highscore = 0

scene('game', () => {


	const PIPE_GAP = 250;
	setGravity(500);
	score = 0

	const bg = add([
		sprite('bg', { width: width(), height: height() }),
		area(),
		'bg'	
	]);

	const bird = add([
		sprite('bird'),
		pos(120, 80),
		area(),
		body({
			jumpForce: 300
		}),
		scale(.15),
		offscreen(),
		'bird'
	]);

	

	const createPipes = () => {
		const offset = rand(-200, 200);
		  const pipeUp = add([
			sprite('pipe'),
			pos(width(), height() / 2 + PIPE_GAP / 2 + offset),
			scale(.4),
			area(),
			{ passed: false },
			'pipe'
		]);
	
			add([
			sprite('pipe', { flipY: true }),
			pos(width(), height() / 2 - PIPE_GAP / 2 + offset - 600),
			scale(.4),
			area(),
			'pipe'
		]);
	}
	

	loop(2.5, () => {
		createPipes()
	})

	const scoreText = add([
		text(`score: ${score}`),
		z(10)
	])

	onUpdate('pipe', (pipe) => {
		pipe.move(-160, 0);
		offscreen({ destroy: true })

		if (pipe.passed === false && pipe.pos.x < bird.pos.x) {
			pipe.passed = true
			score++
		}
		scoreText.text = `score: ${score}`
	});

	onUpdate('bird', (bird) => {
		bird.onExitScreen(() => {
			go('gameover')
		})
	})

	onCollide('bird', 'pipe', () => {
		go('gameover')
	});

	onKeyPress('space', () => {
		bird.jump();
		play('flap')
	});

	onClick('bg', () => {
		bird.jump()
		play('flap')
	})
});

scene('gameover', () => {
	if(score > highscore) highscore = score

	const bg = add([
		sprite('bg', { width: width(), height: height() }),
		area(),
		'bg'	
	]);

	add([
		text(`game over! \nscore: ${score}\nhigh score: ${highscore}` ),
	]);

	onKeyPress('space', () => {
		go('game')
	})

	onClick('bg', () => {
		go('game')
	})

})

go('game')