var map;
var walls;
var ground;
var Game = function() {
    this._width = 800; //window.innerWidth;
    this._height = 600; //window.innerHeight;
    this.game = new Phaser.Game(this._width, this._height, Phaser.AUTO, '', {
        preload: this.preload,
        create: this.create,
        update: this.update
    });
}
Game.prototype = {
    preload: function() {
        this.game.load.tilemap('tilemap', '/assets/secondmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', '/assets/terrain.png');
    },
    create: function() {
        game.stage.backgroundColor = '#182d3b';
        map = this.game.add.tilemap('tilemap');
        map.addTilesetImage('tiles', 'tiles');
        layer = map.createLayer('Ground');
        layer.resizeWorld();
    },
    update: function(){

    }
}

new Game();