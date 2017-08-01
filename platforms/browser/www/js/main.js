//STATIC VARIABLE

var game = new Phaser.Game(720, 1280, Phaser.CANVAS);
var isLogin = false;
var id = 0;
var WHOLE_DATA = {};
var currentScene = "";
var currentIntroIndex = 0;
var nextScene = "";
var nama = "";

var arrSoalData = ["soal_type5.json"];
//urutan state yang digunakan
//var arrStateName = ["inputName","confirmName","intro","choseLine","tutorial","drawing","soal_type1"];
var arrStateName = 
	[
		"inputName",
		"confirmName",
		"intro",
		"choseLine",
		"tutorial",
		"drawing",
		"intro",
		"soal_type1",
		"intro",
		"soal_type3",
		"intro",
		"soal_type1",
		"intro",
		"soal_type1",
		"intro",
		"soal_type5",
		"ending"
	];

var currentIndexState = 0;
var nextStateName = arrStateName[currentIndexState+1];
var prevStateName = arrStateName[0];
var currentJsonIndex = 0;

var arrJsonData = ["DISC.json","MBTI.json","ASIK_32.json","ROLE_32.json","HOLLAND.json"];
var arrText = ["DRAWING \nTEST","DISC\nPERSONALITY\nTEST","MBTI\nTEST","A.S.I.K - 32\nTEST","R.O.L.E - 32\nTEST","R.I.A.S.E.C.\nTEST"];
var arrSprite = ["Test No_1","Test No_2","Test No_3","Test No_4","Test No_5","Test No_6"];

//STATIC FUNCTION 

function nextState()
{
	currentIndexState ++;
	setNextPrevState();
	game.state.start(arrStateName[currentIndexState]);
}

function prevState()
{
	currentIndexState --;
	setNextPrevState();
  	game.state.start(arrStateName[currentIndexState]);
}

function restartApps()
{
	currentIntroIndex = 0;
	currentIndexState = 0;
	currentJsonIndex = 0;
	setNextPrevState();
	game.state.start(arrStateName[currentIndexState]);
}

function setNextPrevState()
{
	
	if(currentIndexState +1 > arrStateName.length - 1)
	{
		nextStateName = arrStateName[currentIndexState.length];
	}else{
		nextStateName = arrStateName[currentIndexState+1];
	}
	
	if(currentIndexState -1 <0)
	{
		prevStateName = arrStateName[0];
	}else{
		prevStateName = arrStateName[currentIndexState-1];
	}

}

function generateIntroScene(spriteName,parent)
{
	var introTrash = [];
	var bg = game.add.sprite(0,0,'White');
	bg.scale.setTo(2);
	bg.tint = 0x2d2f3b;
	introTrash.push(bg);
	bg.inputEnabled = true;

	var hintTextImage = game.add.sprite(game.width/2,game.height/2,spriteName);
	hintTextImage.scale.setTo(2);
	hintTextImage.anchor.setTo(0.5);
	introTrash.push(hintTextImage);

	var nextButton = game.add.button(game.width*0.5, game.height * 0.85, "ButtonSheet",destroyThis,this,"Start button_red","Start button_red","Start button_red_act");
	nextButton.scale.setTo(2);
	nextButton.anchor.setTo(0.5);
	introTrash.push(nextButton);

	function destroyThis()
	{
		for(var i=0;i<introTrash.length;i++)
		{
			introTrash[i].destroy();
		}
		parent.initThis();
	}


}

// END OF STATIC FUNCTION



//registering state
game.state.add('inputName',Scene.inputName);
game.state.add('confirmName',Scene.confirmName);
game.state.add('choseLine',Scene.choseLine);
game.state.add('intro',Scene.intro);
game.state.add('tutorial',Scene.tutorial);
game.state.add('drawing',Scene.drawing);
game.state.add('soal_type1',Scene.soal_type1); //mengurutkan 1  - 4
//game.state.add('soal_type2',Scene.soal_type2);
game.state.add('soal_type3',Scene.soal_type3); //pilih 1 dari 2
//game.state.add('soal_type4',Scene.soal_type4);
game.state.add('soal_type5',Scene.soal_type5); //pilih ya/tidak, dari 7 pertanyaaan
game.state.add('ending',Scene.ending);
game.state.add('intro',Scene.intro);

restartApps();

var radialProgress = {};

var angle = { min: 0, max: 0 };
var color1 = 0xff0000;
var color2 = 0x80ff00;
var radialProgressBar;
var currentTween;
var isStartRadial = false;

radialProgress.create = function(){
	console.log("radial created")
	radialProgressBar = game.add.graphics(game.width * 0.92, game.height * 0.03);
	radialProgressBar.lineStyle(32, 0xFF3366);
	//add the angle change as a tween
}

radialProgress.startRadial = function(longTime){
	console.log("radial started");
	currentTween = game.add.tween(angle).to( { max: 360 }, longTime*1000, "Linear", true, 0, -1, false);
	isStartRadial = true;
};
radialProgress.pause = function(){
	currentTween.pause();
};
radialProgress.resume = function(){
	currentTween.resume();
}
radialProgress.stopAndDestroy = function(){
	angle.max = 0;
	radialProgressBar.destroy();
	currentTween.stop();
	isStartRadial = false;
};

radialProgress.update = function(){
	if(isStartRadial == false)
		return;

	radialProgressBar.clear();
    radialProgressBar.lineStyle(8, 0xFF3366);
    //interpolate the color between red and green, taking 360 degree steps

    radialProgressBar.arc(0, 0, 25, angle.min, game.math.degToRad(360 - angle.max), false);
    radialProgressBar.endFill();

    if(angle.max > 359)
    {
    	radialProgress.stopAndDestroy();
    }
}