Scene.tutorial = function (game) {

};

Scene.tutorial.prototype = {

	preload: function(){
		 //BUTTONSHEET AKAN DIPAKAI DI SEMUA SCREEN
	    game.load.atlasJSONHash('ButtonSheet', 'Assets/AllAsset/UI_Sheet.png', 'Assets/AllAsset/UI_Sheet.json');
	    game.load.image('White', 'Assets/AllAsset/white.png', 'Assets/AllAsset/white.json');
	    game.load.image('pilihan_ganda','Assets/AllAsset/pilihan_ganda_quiz.png');
	    game.load.image('piliah_ya_tidak','Assets/AllAsset/pilihan_ya_tidak_quiz.png');
	    game.load.image('urutkan','Assets/AllAsset/urutkan_quiz.png');

	    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	    game.scale.pageAlignHorizontally = true;
	    game.scale.pageAlignVertically = true;
	    game.scale.forceOrientation(true, false);
	    this.game.scale.refresh();
	    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    game.scale.setMinMax(320, 480, 800, 1280);

		game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
		game.load.atlasJSONHash('ButtonSheet', 'Assets/Button/sheet/button_sheet.png', 'Assets/Button/sheet/button_sheet.json');
		game.load.atlas('cursor', 'Assets/AllAsset/animation/tutorAnimation.png', 'Assets/AllAsset/animation/tutorAnimation.json');

	},

	create: function(){

		
		//use video for tutorial
		/*video = game.add.video('circle');
		video.play(true);
		video.addToWorld(400,300,0.5,0.5);*/

		//animation sprite use JSON
		//sprite = game.add.sprite(game.world.centerX=200, game.world.centerY=10, 'cursor');
	   	//sprite.anchor.set(0.5);
	    //sprite.scale.setTo(0.5);	   
	    //sprite.animations.add('run');
	    //sprite.animations.play('run', 10, true);

	    //animation spritesheet auto
	    tutorialAnimation = game.add.sprite(game.world.centerX, game.world.centerY-350, 'cursor');
	    tutorialAnimation.anchor.set(0.5);
	    tutorialAnimation.scale.setTo(1.5);
    	tutorialAnimation.animations.add('walk',Phaser.Animation.generateFrameNames('cursor_',1,6),6,true);
    	tutorialAnimation.animations.play('walk', 7, true);


		//var button = game.add.sprite(400,470,'button');
		//button.anchor.set(0.5);
		//button.scale.setTo(2.2);

		// height
		var style = { font: "50px Open Sans", fill: "#FFF", boundsAlignH: "center", boundsAlignV: "middle" };	    
	    text = game.add.text(game.world.centerX,game.world.height * 0.65,"Gambarlah",style);
	    text.anchor.set(0.5);
	    var style1 = { font: "50px Open Sans", fill: "#FFF", boundsAlignH: "center", boundsAlignV: "middle" };	    
	    text = game.add.text(game.world.centerX,game.world.height * 0.70,"Lingkaran",style1);
	    text.anchor.set(0.5);
	    // end height

	    // scale, height
		button = game.add.button(game.world.centerX, game.world.height * 0.85, 'ButtonSheet', this.nextScene, this, 'Start button_red', 'Start button_red', 'Start button_red_act');
		button.scale.setTo(2);
		// end scale
		button.anchor.set(0.5);
		button.onInputDown.add(this.onButtonDown, this);
        button.onInputUp.add(this.onButtonUp, this);
	},

	onButtonUp: function(){
    	button.scale.set(2);
    },

    onButtonDown: function(){
        button.scale.set(2);
    },

	nextScene: function() {

		//video.stop();
		nextState();

	}

}