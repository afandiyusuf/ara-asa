Scene.choseLine = function (game) {
	var sizeLine;
};
var _;
var selectedLine  = null;

Scene.choseLine.prototype = {

	preload: function(){

		//BUTTONSHEET AKAN DIPAKAI DI SEMUA SCREEN
		game.load.atlasJSONHash('ButtonSheet', 'Assets/AllAsset/UI_Sheet.png', 'Assets/AllAsset/UI_Sheet.json');
		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.forceOrientation(true, false);
		this.game.scale.refresh();
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setMinMax(320, 480, 800, 1280);

		game.load.image('line_small', 'assets/line1.png');
		game.load.image('line_medium', 'assets/line2.png');
		game.load.image('line_large', 'assets/line3.png');
		game.load.atlasJSONHash('ButtonSheet', 'Assets/Button/sheet/button_sheet.png', 'Assets/Button/sheet/button_sheet.json');
		background = game.stage.backgroundColor = "#2d2f3b";
		game.load.image('header','assets/01_Screen Preview/header.png');
	},

	create: function() {
		WHOLE_DATA.circle = {};
		_ = this;
		var header = game.add.sprite(0,0,'header');
		header.scale.setTo(2);

		

		button_small = game.add.button(game.world.width * 0.05, game.world.height * 0.04, 'line_small', null, null, 2, 1, 0);
	    button_small.scale.setTo(2);
	   	button_small.onInputDown.add(this.buttonDown, button_small);
        button_small.onInputUp.add(this.buttonUp, button_small);
        button_small.lineName = "small";
        button_small.lineSize = 10;
        
        this.smallContainer = game.add.sprite(button_small.x,button_small.y,'ButtonSheet','RIASEC Opt_grey');
        this.smallContainer.scale.y = 2;
        this.smallContainer.scale.x = 4;
        this.smallContainer.alpha = 0.5;
        button_small.container = this.smallContainer;

		button_medium = game.add.button(game.world.width * 0.35, game.world.height * 0.04, 'line_medium', null, null, 2, 1, 0);
	    button_medium.scale.setTo(2);
	    button_medium.onInputDown.add(this.buttonDown, button_medium);
        button_medium.onInputUp.add(this.buttonUp, button_medium);
        button_medium.lineName = "medium";
        button_medium.lineSize = 50;
        this.mediumContainer = game.add.sprite(button_medium.x,button_medium.y,'ButtonSheet','RIASEC Opt_grey');
        this.mediumContainer.scale.y = 2;
        this.mediumContainer.scale.x = 4;
        this.mediumContainer.alpha = 0.5;
		button_medium.container = this.mediumContainer;

	    button_large = game.add.button(game.world.width * 0.65, game.world.height * 0.038, 'line_large', null, null, 2, 1, 0);
	    button_large.scale.setTo(2);	 
	    button_large.onInputDown.add(this.buttonDown, button_large);
        button_large.onInputUp.add(this.buttonUp, button_large);
        button_large.lineName = "large";
        button_large.lineSize = 100;

        this.largeContainer = game.add.sprite(button_large.x,button_large.y,'ButtonSheet','RIASEC Opt_grey');
        this.largeContainer.scale.y = 2;
        this.largeContainer.scale.x = 4;
        this.largeContainer.alpha = 0.5;
        button_large.container = this.largeContainer;


        game.world.bringToTop(button_small);
        game.world.bringToTop(button_medium);
        game.world.bringToTop(button_large);
        // end // scale, size gambar, sprite

		// height , scale
		nextButton = game.add.button(game.world.centerX, game.world.height * 0.85, 'ButtonSheet', this.choseLine, this, 'Next_l', 'Next_l', 'Next_l_act');
		nextButton.anchor.set(0.5);
		nextButton.scale.setTo(2);
		nextButton.visible = false;
		// end height, scale
		
		var line_size=0;
		// font,  height, scale
		var style = { font: "21px Open Sans", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };	    
	    //textAtas = game.add.text(game.world.centerX,50,"test menggambar",style);
	    //textAtas.anchor.set(0.5);
	    textBawah = game.add.text(game.world.centerX,game.world.height * 0.7,"Pilih Garis",style);
	    textBawah.anchor.set(0.5);
	    textBawah.scale.setTo(2);

	    this.disableAllContainer();
	},
	buttonDown: function(){
		this.scale.setTo(1.8);
	},
	disableAllContainer(){
		_.smallContainer.visible 	= false;
		_.mediumContainer.visible 	= false;
		_.largeContainer.visible 	= false;
	},
	buttonUp: function(){
		this.scale.setTo(2);
		sizeLine = this.lineSize;
		selectedLine = this.lineName;
		nextButton.visible = true;
		_.disableAllContainer();
		this.container.visible = true;
	},

	choseLine: function(){
		nextState();
    }

}