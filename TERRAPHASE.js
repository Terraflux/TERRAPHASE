var FONT = 75;
var ROWS = 10;
var COLS = 20;
var ACTORS = 20;
var map;
var asciidisplay;
var player;
var actorList;
var livingEnemies;
var actorMap;
var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.AUTO, null, {
    create: create
});

function create() {
    game.input.keyboard.addCallbacks(null, null, onKeyUp);
    initMap();
    asciidisplay = [];
    for (var y = 0; y < ROWS; y++) {
        var newRow = [];
        asciidisplay.push(newRow);
        for (var x = 0; x < COLS; x++)
            newRow.push(initCell('', x, y));
    }
    initActors();
    drawMap();
    drawActors();
}

function initCell(chr, x, y){
    var style = {
        font: FONT + "px monospace",
        fill: "#fff"
    };
    return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
}

function initMap() {
    map = [];
    for (var y = 0; y < ROWS; y++) {
        var newRow = [];
        for (var x = 0; x < COLS; x++) {
            if (Math.random() > 0.8) 
                newRow.push('#');
            else 
                newRow.push('.');
        }
        map.push(newRow);
    }
}

function drawMap() {
    for (var y = 0; y < ROWS; y++)
        for (var x = 0; x < COLS; x++)
            asciidisplay[y][x].content = map[y][x];
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function initActors() {
    actorList = [];
    actorMap = {};
    for (var e = 0; e < ACTORS; e++) {
        var actor = {
            x: 0,
            y: 0,
            hp: e == 0 ? 3 : 1
        };
        do {
            actor.y = randomInt(ROWS);
            actor.x = randomInt(COLS);
        } while (map[actor.y][actor.x] == '#' || actorMap[actor.y + "_" + actor.x] != null);
        actorMap[actor.y + "_" + actor.x] = actor;
        actorList.push(actor);
    }
    player = actorList[0];
    livingEnemies = ACTORS - 1;
}

function drawActors() {
    for (var a in actorList) {
        if (actorList[a].hp > 0) 
            asciidisplay[actorList[a].y][actorList[a].x].content = a == 0 ? '' + player.hp : 'e';
    }
}

function onKeyUp(event) {
	drawMap();
	var acted = false;
	switch (event.keyCode) {
		case Phaser.Keyboard.LEFT:
			acted = moveTo(player, {x:-1, y:0});
			break;

		case Phaser.Keyboard.RIGHT:
			acted = moveTo(player,{x:1, y:0});
			break;
			
		case Phaser.Keyboard.UP:
			acted = moveTo(player, {x:0, y:-1});
			break;

		case Phaser.Keyboard.DOWN:
			acted = moveTo(player, {x:0, y:1});
			break;
	}
	if (acted)
		for (var enemy in actorList) {
			if(enemy==0)
				continue;
			var e = actorList[enemy];
			if (e != null)
				aiAct(e);
	}
	drawActors();
}

function canGo(actor, dir) {
	return 	actor.x+dir.x >= 0 &&
			actor.x+dir.x <= COLS - 1 &&
			actor.y+dir.y >= 0 &&
			actor.y+dir.y <= ROWS - 1 &&
			map[actor.y+dir.y][actor.x +dir.x] == '.';
}

function moveTo(actor, dir) {
    if (!canGo(actor,dir))
            return false;
    var newKey = (actor.y + dir.y) + '_' + (actor.x + dir.x);
    if (actorMap[newKey] != null) {
            var victim = actorMap[newKey];
            victim.hp--;
            if (victim.hp == 0) {
                    actorMap[newKey]= null;
                    actorList[actorList.indexOf(victim)]=null;
                    if(victim!=player) {
                            livingEnemies--;
                            if (livingEnemies == 0) {
                                    var victory = game.add.text(game.world.centerX, game.world.centerY, 'Victory!\nCtrl+r to restart', { fill : '#2e2', align: "center" } );
                                    victory.anchor.setTo(0.5,0.5);
                            }
                    }
            }
    } else {
            actorMap[actor.y + '_' + actor.x]= null;
            actor.y+=dir.y;
            actor.x+=dir.x;
            actorMap[actor.y + '_' + actor.x]=actor;
    }
    return true;
}

function aiAct(actor) {
	var directions = [ { x: -1, y:0 }, { x:1, y:0 }, { x:0, y: -1 }, { x:0, y:1 } ];	
	var dx = player.x - actor.x;
	var dy = player.y - actor.y;
	if (Math.abs(dx) + Math.abs(dy) > 6)
		while (!moveTo(actor, directions[randomInt(directions.length)])) { };
	if (Math.abs(dx) > Math.abs(dy)) {
		if (dx < 0) {
			moveTo(actor, directions[0]);
		} else {
			moveTo(actor, directions[1]);
		}
	} else {
		if (dy < 0) {
			moveTo(actor, directions[2]);
		} else {
			moveTo(actor, directions[3]);
		}
	}
	if (player.hp < 1) {
		var gameOver = game.add.text(game.world.centerX, game.world.centerY, 'Game Over\nCtrl+r to restart', { fill : '#e22', align: "center" } );
		gameOver.anchor.setTo(0.5,0.5);
	}
}