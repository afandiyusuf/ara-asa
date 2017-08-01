/**
* Soal tipe 1 adalah soal dengan cara menjawab mengurutkan dari 1 - 4
*/
var textJawaban1;
var textJawaban2;
var textJawaban3;
var textJawaban4;
Scene.soal_type1 = function (game) {
        var phaserJSON;
        var arraySoal;
        var arrayJawaban;
        var arrayWarna;
        var urutanBenar;
        var urutanSalah;
        var _benar;
        var i; // i adalah nomor soal yang ditampilkan
        var index; // jumlah array soal
        var totalIndex; // angka yg dibutuhkan untuk bisa lanjut ke tipe soal berikutnya
        var jumlahSoal;
        var urutanKlik;
        var buttonNext;
        var buttonBack;
        var textnumber1;
        var textnumber2;
        var textnumber3;
        var textnumber4;
        var timer;
        var secound;
        var textSoal;
        var ArrPanelSelected;
        var ArrNumberSelected;
};

Scene.soal_type1.prototype = {
	//arraySoal: [],

	preload: function(){

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

        game.stage.backgroundColor = "#2d2f3b"; 

		//game.load.image('box','./assets/box.png');
        game.load.image('back','./assets/nextButton.png');
        game.load.image('next','./assets/backButton.png');
		game.load.json('soal', './json/'+arrJsonData[currentJsonIndex]);
        currentJsonIndex++;
	},

	create: function(){
        this.isInit = false;

        generateIntroScene("urutkan",this);
	},
    initThis :function(){
        this.isInit = true;
        WHOLE_DATA.soal_type1 = [];
        var ArrPanelSpritename = ["Disc Opt1_orange","Disc Opt2_yellow","Disc Opt3_blue","Disc Opt4_tosca"];
        var ArrNumberSpriteName = ["Opt No_1","Opt No_2","Opt No_3","Opt No_4","Opt No_5"];
        urutanBenar=0;
        urutanSalah=0;
        _benar=0;
        i=0;
        totalIndex=0;
        urutanKlik=0;
        secound=0;
        pilihan1=0;
        pilihan2=0;
        pilihan3=0;
        pilihan4=0;
        soalType1=[];        
        allPilihan=[];      
        arrayJawaban=[];
        arraySoal=[];
        arrayWarna=["0x00ff00","0xffff00","0xff0000","0x0000ff"];
        saveToObj={};
        saveSoalType1={};
        terjawab=false;

        phaserJSON = game.cache.getJSON('soal');//JSON.parse(game.cache.getText('soal'));
        jumlahSoal = phaserJSON.soals.length;
        index = phaserJSON.soals[0].pilihan.length;

        //console.log(phaserJSON.soals);

        arraySoal = Phaser.ArrayUtils.numberArray(0,jumlahSoal-1);
        Phaser.ArrayUtils.shuffle(arraySoal);

        arrayJawaban = Phaser.ArrayUtils.numberArray(0,3);
        Phaser.ArrayUtils.shuffle(arrayJawaban);

        //console.log(arraySoal);
        //change type to open sans font
        style = { font: "Open Sans",fontSize: "32px", fill: "#000", align: "center"}; 
        //disable soal urutkan    
        // text = game.add.text(game.world.centerX,150,"soal urutkan",style);
        // text.anchor.set(0.5);
        
        styleSoal = { font: "Open Sans",fontSize: "32px", fill: "#ffffff", align: "center", wordWrapWidth : game.width*0.8, wordWrap: true};
        textSoal = game.add.text(game.world.centerX, game.world.centerY-400, phaserJSON.soals[arraySoal[i]].pertanyaan, styleSoal);
        textSoal.anchor.set(0.5);
        

        //Button untuk pilihan 1 / A
        this.button1 = game.add.button(game.world.centerX, game.height*0.35, 'ButtonSheet', this.answerButton, this, "MBTI Opt_grey", "MBTI Opt_grey", "MBTI Opt_grey");
        textJawaban1 = game.add.text(game.world.centerX, game.world.centerY-150, phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[0]].text, styleSoal);        
        this.button1.textJawaban = textJawaban1;
        this.button1.anchor.setTo(0.5);
        this.button1.scale.setTo(2);
        textJawaban1.anchor.set(0.5);
        textJawaban1.x = this.button1.x;       
        textJawaban1.y = this.button1.y;

        //Button untuk pilihan 2 / B
        this.button2 = game.add.button(game.world.centerX, game.height*0.49, 'ButtonSheet', this.answerButton, this, "MBTI Opt_grey", "MBTI Opt_grey", "MBTI Opt_grey");        
        textJawaban2 = game.add.text(game.world.centerX, game.world.centerY-50, phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[1]].text, styleSoal);
        this.button2.textJawaban = textJawaban2;
        this.button2.anchor.setTo(0.5);
        this.button2.scale.setTo(2);
        textJawaban2.anchor.set(0.5);
        textJawaban2.x = this.button2.x;
        textJawaban2.y = this.button2.y;

        
        //Button untuk pilihan 4 / C
        this.button3 = game.add.button(game.world.centerX, game.height*0.63, 'ButtonSheet', this.answerButton, this, "MBTI Opt_grey", "MBTI Opt_grey", "MBTI Opt_grey");
        textJawaban3 = game.add.text(game.world.centerX, game.world.centerY+50, phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[2]].text, styleSoal);
        this.button3.textJawaban = textJawaban3;
        this.button3.anchor.setTo(0.5);
        this.button3.scale.setTo(2);
        textJawaban3.anchor.set(0.5);
        textJawaban3.x = this.button3.x;
        textJawaban3.y = this.button3.y;
        
        //Button untuk pilihan 4 / D
        this.button4 = game.add.button(game.world.centerX, game.height*0.77, 'ButtonSheet', this.answerButton, this, "MBTI Opt_grey", "MBTI Opt_grey", "MBTI Opt_grey");
        textJawaban4 = game.add.text(game.world.centerX, game.world.centerY+150, phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[3]].text, styleSoal);
        this.button4.textJawaban = textJawaban4;

        this.button4.anchor.setTo(0.5);
        this.button4.scale.setTo(2);
        textJawaban4.anchor.set(0.5);
        textJawaban4.x = this.button4.x;
        textJawaban4.y = this.button4.y;
        

        //add background for totalSoal indicator
        var bgTextJumlahSoal = game.add.sprite(game.width*0.01,game.height*0.01,'ButtonSheet','BG Task indicator');
        bgTextJumlahSoal.scale.setTo(2);
        //style jumlah soal
        styleBold = { font: "Open Sans",fontSize: "24px", fill: "#ffffff", align: "center",stroke:"#ffffff",strokeThickness:1};     
        textJumlahSoal = game.add.text(game.width * 0.09, game.height * 0.015, (i+1)+'/'+jumlahSoal,styleBold);
        textJumlahSoal.anchor.set(0);

        buttonBack = game.add.button(game.world.centerX, game.height*0.92, 'ButtonSheet', this.hitBack, this, "Reset button", "Reset button", "Reset button_act");
        buttonBack.scale.setTo(2);
        buttonBack.anchor.setTo(0.5);
        buttonBack.onInputDown.add(this.onButtonDown1, this);
        buttonBack.onInputUp.add(this.onButtonUp1, this);

        buttonNext = game.add.button(game.world.centerX+200, game.world.centerY+450, 'ButtonSheet', this.nextSoal, this, "Next_s","Next_s","Next_s_act");
        buttonNext.scale.setTo(2);
        buttonNext.anchor.setTo(0.5);
        buttonNext.onInputDown.add(this.onButtonDown2, this);
        buttonNext.onInputUp.add(this.onButtonUp2, this);
        buttonNext.visible = false;

        textnumber1 = game.add.text(game.world.centerX-230,game.world.centerY-170,'',style);
        textnumber2 = game.add.text(game.world.centerX-230,game.world.centerY-70,'',style);
        textnumber3 = game.add.text(game.world.centerX-230,game.world.centerY+30,'',style);
        textnumber4 = game.add.text(game.world.centerX-230,game.world.centerY+130,'',style);

        textTime = game.add.text(game.width * 0.92, game.height* 0.03, '0',styleBold);
        textTime.anchor.set(0.5);
        radialProgress.create();
        radialProgress.startRadial(phaserJSON.waktu);

        waktu = (phaserJSON.waktu)*1000;
        timer = game.time.create(false); 
        timer.loop(waktu, this.randomSoal, this);
        timer.start();

        //game.input.onUp.add(this.mouseUp,this);

        ArrPanelSelected = [];
        ArrNumberSelected = [];

        for(var j=0;j<4;j++)
        {
            ArrPanelSelected[j] = game.add.sprite(0,0,"ButtonSheet",ArrPanelSpritename[j]);
            ArrPanelSelected[j].scale.setTo(2);
            ArrPanelSelected[j].anchor.setTo(0.5);
            ArrPanelSelected[j].visible = false;
            ArrNumberSelected[j] = game.add.sprite(0,0,"ButtonSheet",ArrNumberSpriteName[j]);
            ArrNumberSelected[j].scale.setTo(2);
            ArrNumberSelected[j].visible = false;
            ArrNumberSelected[j].anchor.x = 1;
            ArrNumberSelected[j].x = ArrPanelSelected[j].width +  ArrPanelSelected[j].x;

        }
       
    },
    update: function(){
        radialProgress.update();
        if(!this.isInit)
            return;

        if(urutanKlik>0){
            buttonBack.x = game.world.centerX;
            buttonBack.y = game.height*0.92;
            buttonBack.visible = true;
            buttonBack.inputEnabled = true;
        }
        else{
            buttonBack.inputEnabled = false;
            buttonBack.visible = false;
        }            

        if (urutanKlik==index)
        {            
            buttonNext.visible = true;
            buttonNext.inputEnabled = true;
            buttonNext.y = buttonBack.y;
            buttonNext.x = game.width/2 + game.width*0.2;
            buttonBack.x = game.width/2 - game.width*0.2;
        }
        else{
            buttonNext.inputEnabled = false;
            buttonNext.visible = false;
        }    

        textTime.setText(secound);
            if(timer.duration.toFixed(0)>0){
                secound = Math.floor(timer.duration.toFixed(0)/1000)+1;
            }              
    },

    onButtonUp1: function(){
    },

    onButtonDown1: function(){
    },

    onButtonUp2: function(){
        timer.loop(waktu, this.randomSoal, this);
        timer.start();
    },

    onButtonDown2: function(){
        timer.stop();
    },

	answerButton: function(button){
        console.log("CLICK");
    	button.inputEnabled = false;        
        button.tint=arrayWarna[urutanKlik];
        
        
        ArrPanelSelected[urutanKlik].x = button.x;
        ArrPanelSelected[urutanKlik].y = button.y;
        ArrPanelSelected[urutanKlik].visible = true;

        ArrNumberSelected[urutanKlik].x = ArrPanelSelected[urutanKlik].width + ArrPanelSelected[urutanKlik].x - (ArrPanelSelected[urutanKlik].width/2) + (game.width*0.01);
        ArrNumberSelected[urutanKlik].y = ArrPanelSelected[urutanKlik].y - (ArrPanelSelected[urutanKlik].height/2) - (game.height*0.001);
        ArrNumberSelected[urutanKlik].visible = true;

        //game.world.bringToTop(ArrNumberSelected[urutanKlik]);
        game.world.bringToTop(button.textJawaban);
        textJawaban1 = button.textJawaban;
    	if(urutanKlik<5)
    		urutanKlik++;

        pilihan1=urutanKlik;
    },

    nextSoal: function(){
        terjawab=true;        
        this.randomSoal();
    },

    randomSoal: function(){
        var pertanyaan = {}; //variable untuk pertanyaan tersimpan
        var jawaban; //variable untuk jawaban tersimpan
        if(terjawab)
        {

            terjawab = false;
            soalKuis = phaserJSON.soals[arraySoal[i]].pertanyaan;
            jawaban  = [];
            jawaban[0] = phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[0]];
            jawaban[1] = phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[1]];
            jawaban[2] = phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[2]];
            jawaban[3] = phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[3]];
        }
        else
        {
            terjawab=false;
            jawaban  =  null;
        }

        

        pertanyaan.text = phaserJSON.soals[arraySoal[i]].pertanyaan;
        pertanyaan.id = phaserJSON.soals[arraySoal[i]].id;
        WHOLE_DATA.soal_type1[i] = {};

        WHOLE_DATA.soal_type1[i].pertanyaan = pertanyaan;
        WHOLE_DATA.soal_type1[i].jawaban = jawaban;

        textJumlahSoal.setText((i+2)+'/'+jumlahSoal);
        urutanKlik=0;    
        //console.log(index);
        
        if(i<jumlahSoal)
            i++;
        if(i==jumlahSoal){
            timer.stop();            
            nextState();
            radialProgress.stopAndDestroy();
            return;         
        }                    

        radialProgress.stopAndDestroy();
        radialProgress.create();
        radialProgress.startRadial(phaserJSON.waktu);

        textSoal.setText(phaserJSON.soals[arraySoal[i]].pertanyaan);
        textJawaban1.setText(phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[0]].text);
        textJawaban2.setText(phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[1]].text);
        textJawaban3.setText(phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[2]].text);
        textJawaban4.setText(phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[3]].text);

        this.button1.inputEnabled = true;
        this.button2.inputEnabled = true;
        this.button3.inputEnabled = true;
        this.button4.inputEnabled = true;

        this.button1.tint=0xffffff;
        this.button2.tint=0xffffff;
        this.button3.tint=0xffffff;
        this.button4.tint=0xffffff;
        this.hideAllSelectedSprite();
        textnumber1.setText('');
        textnumber2.setText('');
        textnumber3.setText('');
        textnumber4.setText('');
    },
    hitBack: function(){
        urutanKlik=0;
        
        this.button1.inputEnabled = true;
        this.button2.inputEnabled = true;
        this.button3.inputEnabled = true;
        this.button4.inputEnabled = true;

        this.button1.tint=0xffffff;
        this.button2.tint=0xffffff;
        this.button3.tint=0xffffff;
        this.button4.tint=0xffffff;

        textnumber1.setText('');
        textnumber2.setText('');
        textnumber3.setText('');
        textnumber4.setText('');
        this.hideAllSelectedSprite();
        _benar=0;
    },
    hideAllSelectedSprite:function()
    {
        for(var j=0;j<4;j++)
        {
            ArrNumberSelected[j].visible = false;
            ArrPanelSelected[j].visible = false;
        }
    }
}