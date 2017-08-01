Scene.intro = function(game){

	var sprite;
	var text;
	var style;
	var style1;

}

Scene.intro.prototype = {

	preload: function(){
		game.load.atlasJSONHash('ButtonSheet', 'Assets/AllAsset/UI_Sheet.png', 'Assets/AllAsset/UI_Sheet.json');
		game.load.image('fullscreen','Assets/AllAsset/fullscreen.png');
		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.forceOrientation(true, false);
        this.game.scale.refresh();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(320, 480, 800, 1280);
        game.stage.backgroundColor = "#ff3c5e";
	},
    
	create: function() {
		var index = 0;
		sprite = game.add.sprite(game.width, 0, 'ButtonSheet',arrSprite[currentIntroIndex]);
		sprite.anchor.x = 1;
		sprite.anchor.y = 0;
		sprite.scale.setTo(2);

		style = { font: "bold 45px Open Sans", fill: "#fff", align: "left"};
		text = game.add.text(game.width * 0.07, game.world.height * 0.05, arrText[currentIntroIndex], style); 
		text.scale.setTo(2);

		this.invisNext = game.add.sprite(0, 0, 'fullscreen');
		this.invisNext.events.onInputUp.add(this.nextState, this);
		this.invisNext.inputEnabled = true;
		this.invisNext.scale.setTo(2);
		this.invisNext.alpha = 0;
	},
	nextState:function(){
		currentIntroIndex++;
		nextState();
	}

}
