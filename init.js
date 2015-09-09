
var FONT = 75;
var ROWS = 10;
var COLS = 20;
var ACTORS = 20;

var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.AUTO);

// 3 states: Menu, Play, and Done

// Menu state
game.Menu = function() {};
var startButton;

game.Menu.prototype = 
{
	onClickStart: function()
	{
		console.log('clicked start button');
		game.state.start('play');
		//game.state.start('done');
	},

	preload: function() 
	{
		console.log('Menu.preload');
		game.load.image('button', 'assets/start_button.png', 193, 71);
	},
	create: function()
	{
		console.log('Menu.create');
	    startButton = game.add.button(game.world.centerX - 95, 400,'button', this.onClickStart, this/*,Upframe, downframe, etc*/);
	},
	update: function()
	{
		//console.log('Menu.update');

	},
	render: function()
	{
		//console.log('Menu.render');

	}	
};

// Play state
game.Play = function () {};
var map;
var layer;
var tiles;
var tilemap;
game.Play.prototype = 
{

	preload: function() 
	{
		console.log('Play.preload');
		tilemap = game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		tiles = game.load.image('tiles', 'assets/kenney.png');

	},
	create: function()
	{
		console.log('Play.create');
		map = game.add.tilemap('map');

		// first arg comes from tilemap.json: tilesets[0].name, second arg is image key
		map.addTilesetImage('kenney', 'tiles');

		// layer id comes from tilemap.json: layers[0].name
		layer = map.createLayer('Tile Layer 1');
		game.input.onDown.add(function() { game.state.start('done') });
		//layer.resizeWorld();
	},
	update: function()
	{
		//console.log('Play.update');

	},
	render: function()
	{
		//console.log('Play.render');

	}		
};

// Done state
game.Done = function () {};

game.Done.prototype = 
{
	preload: function() 
	{
		console.log('Done.preload');

	},
	create: function()
	{
		console.log('Done.create');
	    var text = "You won 100-13";
	    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

	    var t = game.add.text(game.world.centerX - 100, game.world.centerY, text, style);

	},
	update: function()
	{
		//console.log('Play.update');

	},
	render: function()
	{
		//console.log('Play.render');

	}		
}

var stateManager = new Phaser.StateManager();


game.state.add('menu', game.Menu);
game.state.add('play', game.Play);
game.state.add('done', game.Done);
game.state.start('menu');

// this is a bad idea, since states are not really 
// meant to be oscillated between, they destroy everything in the world by default
//var myTurn = game.Turn();
//var theirTurn = game.Turn();
//game.state.add('myTurn', myTurn);
//game.state.add('theirTurn', theirTurn);


