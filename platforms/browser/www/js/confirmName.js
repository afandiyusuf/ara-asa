Scene.confirmName = function(game){

	var sprite;
	var text;

}

Scene.confirmName.prototype = {

	preload: function(){

		game.stage.backgroundColor = '#FF3366';
		//game.load.image('bg_menu', 'assets/bgText.png');
		game.load.image('buttonSheet', 'Assets/Button/sheet/button_sheet.png', 'Assets/Button/sheet/button_sheet.json');
		game.load.image('form','assets/BG/Typeform.png');


	},

	create: function() {
		
		//var nextButton = game.add.sprite(game.world.centerX=255,game.world.centerY=980,'nextButton');
		// fontsize, sprite, scale
		var style = { font: "25px Open Sans", fill: "#FFF", boundsAlignH: "center", boundsAlignV: "middle" };	    
	    text = game.add.text(game.world.width * 0.5,game.world.height * 0.3,"Apakah Nama Kamu",style);
	    text.anchor.set(0.5);
	    text.scale.setTo(2);
	    text = game.add.text(game.world.width * 0.5,game.world.height * 0.35,"Sudah Benar?",style);
	    text.anchor.set(0.5);
	    text.scale.setTo(2);
	    //end fontsize, sprite, scale


	    

		//var style = { font: " bold 30px Calibri", fill: "#000", wordWrap: true, wordWrapWidth: sprite.width, boundsAlignH: "center", boundsAlignV: "middle" };	    
	    //textTanya = game.add.text(game.world.centerX,400,"APAKAH NAMA",style);
	    //textTanya = game.add.text(game.world.centerX,300,"KAMU SUDAH",style);
	    //textTanya = game.add.text(game.world.centerX,450,"BENAR ?",style);
	   // textTanya.anchor.set(0.5);

	   // mengubah font, sprite, scale 
	    var style1 = { font: "bold 50px Open Sans", fill: "#999", boundsAlignH: "center", boundsAlignV: "middle" };
	    var form = game.add.sprite(game.world.centerX,game.world.height * 0.7,'form');
	    form.anchor.set(0.5);
	    form.scale.setTo(2);
	    textNama = game.add.text(game.world.centerX,game.world.height * 0.7,nama,style1);
	    textNama.anchor.setTo(0.5);
	    form.inputEnabled = true;
	    form.events.onInputUp.add(this.prevScene,this);
	    // end // mengubah font, sprite, scale
	  

	    button1 =  game.add.button(game.world.centerX, game.world.height * 0.85, 'ButtonSheet', this.nextScene, this, 'Start button_black', 'Start button_black', 'Start button_black_act');
	    button1.scale.setTo(2);
	    button1.anchor.set(0.5);
	    button1.onInputDown.add(this.onButtonDown1, this);
        button1.onInputUp.add(this.onButtonUp1, this);
	    
	   // button2 = game.add.button(game.world.centerX, 800, 'backButton', this.prevScene, this, 2, 1, 0);
	   // button2.scale.setTo(0.5);
	   // button2.anchor.set(0.5);
	   // button2.onInputDown.add(this.onButtonDown2, this);
       // button2.onInputUp.add(this.onButtonUp2, this);

        /*invocation = new XMLHttpRequest();
        url = 'http://www.inmotion.web.id/testbed/ara-asa-api/api/user/login/';*/        
	},
	prevScene: function(){
		prevState();
	},
	nextScene: function() {

		var _ = this;
		WHOLE_DATA.user = {};
		WHOLE_DATA.user.name = nama;
		$.ajax({
			type:"POST",
			url:"http://www.inmotion.web.id/testbed/ara-asa-api/api/user/login",

    		dataType:"json",
			data:{
				username:nama
			},
    		success: function(data) {
      			console.log(data.message.toString());
      			isLogin = true;
      			id = data.data[0].user_id;
      			WHOLE_DATA.user.id = id;
    		},
    		error: function(data){    			
    			console.log(data.message.toString());
    		}
  		});
		nextState();
      	//_.fade('soal_type1');
	


	},
	// mengubah scale
	onButtonUp1: function(){
    	button1.scale.set(2);
    },

    onButtonDown1: function(){
        button1.scale.set(2);
    },
    // end // mengubah scale

   // onButtonUp2: function(){
   // 	button2.scale.set(0.5);
   // },
//
   // onButtonDown2: function(){
   //     button2.scale.set(0.4);
   // },
//

}