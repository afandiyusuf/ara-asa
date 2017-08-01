Scene.ending = function(game){
	var nama;
}

Scene.ending.prototype = {

	preload: function(){

        game.load.image('nextButton', 'assets/nextButton.png');
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

        game.stage.backgroundColor = "#FF3366";
	},

	create: function(){

		button = game.add.button(game.world.centerX, game.world.centerY, 'nextButton', this.click, this, 2, 1, 0);
		button.scale.setTo(2);
		button.anchor.set(0.5);
		button.alpha = 0;
		button.onInputDown.add(this.onButtonDown, this);
        button.onInputUp.add(this.onButtonUp, this);

		var styleSoal = { font: "Open Sans",fontSize: "50px", fill: "#ffffff", align: "center", wordWrapWidth : game.width*0.8, wordWrap: true, stroke:"#ffffff",strokeThickness:2};	    
	    text = game.add.text(game.world.centerX,game.world.centerY-200,"TERIMA KASIH\nATAS PARTISIPASI\nANDA",styleSoal);
	    text.anchor.set(0.5);

        localStorage.setItem("save", JSON.stringify(WHOLE_DATA));
        console.log(localStorage.getItem("save"));

	},

	onButtonUp: function(){
    	button.scale.set(0.5);
    },

    onButtonDown: function(){
        button.scale.set(0.4);
    },

	click: function(){

		//this.state.start('confirmName');
		restartApps();
		//console.log(nama);

	},
};