var map;
var player;
var agentList;
var agentMap;
var game = new Phaser.Game(800, 600, Phaser.AUTO, null, 
    {preload: preload, create: create, update: update, render: render});

function preload() {
    game.load.tilemap('tilemap', 'assets/firstmap.json', null, Phaser.Tilemap.TILED_JSON);
}


function create() {

    game.stage.backgroundColor = '#182d3b';

    //keyboard callback for turn management not required
    //game.input.keyboard.addCallbacks(null, null, onKeyUp);
    //New time control:
    turnControl();

    // A button to indicate turn end:

    endbutton = (game.world.centerX - 95, 400, 'endbutton', actionOnClick, this, 2, 1, 0);
}


function turnControl(){

    if (turnEnd) {
        // update the board state
    }
}














// This was rudimentary code for turns being based on single key events

// function onKeyUp(event) {
// 	drawMap();
// 	var acted = false;
// 	switch (event.keyCode) {
// 		case Phaser.Keyboard.LEFT:
// 			acted = moveTo(player, {x:-1, y:0});
// 			break;

// 		case Phaser.Keyboard.RIGHT:
// 			acted = moveTo(player,{x:1, y:0});
// 			break;
			
// 		case Phaser.Keyboard.UP:
// 			acted = moveTo(player, {x:0, y:-1});
// 			break;

// 		case Phaser.Keyboard.DOWN:
// 			acted = moveTo(player, {x:0, y:1});
// 			break;
// 	}
// 	if (acted)
// 		for (var enemy in actorList) {
// 			if(enemy==0)
// 				continue;
// 			var e = actorList[enemy];
// 			if (e != null)
// 				aiAct(e);
// 	}
// 	drawActors();
// }