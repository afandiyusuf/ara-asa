Scene.soal_type5 = function (game) {      
};
    var phaserJSON;
    var arraySoal;
    var currentIteration; // jumlah soal yang ditampilkan
    var totalIteration; // jumlah array soal
    var maxSoalInOneIteration; // jumlah soal dalam 1 putaran
    var totalIndex; // angka yg dibutuhkan untuk bisa lanjut ke tipe soal berikutnya
    var jumlahSoal;
    var timer;
    var secound;
    var trashCan = [];
    var arrJawabanType5  = [];
    var currentTimer = 0;
    var maxTimer = 60;

Scene.soal_type5.prototype = {
        
        preload: function(){
            game.load.atlasJSONHash('ButtonSheet', 'Assets/AllAsset/UI_Sheet.png', 'Assets/AllAsset/UI_Sheet.json');
            game.load.image('White', 'Assets/AllAsset/white.png', 'Assets/AllAsset/white.json');
            game.load.image('pilihan_ganda','Assets/AllAsset/pilihan_ganda_quiz.png');
            game.load.image('piliah_ya_tidak','Assets/AllAsset/pilihan_ya_tidak_quiz.png');
            game.load.image('urutkan','Assets/AllAsset/urutkan_quiz.png');

            game.load.image('White', 'Assets/AllAsset/white.png', 'Assets/AllAsset/white.json');
            game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.forceOrientation(true, false);
            this.game.scale.refresh();
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setMinMax(320, 480, 800, 1280);

            game.stage.backgroundColor = "#2d2f3b";
            game.load.image('nextButton', './assets/nextButton.png');             
            game.load.json('soal', './json/'+arrJsonData[currentJsonIndex]);
            currentJsonIndex++;

        },

        create: function(){
            this.isInit = false;
            generateIntroScene("piliah_ya_tidak",this);

        },
        initThis: function(){
            this.isInit = true;
            currentTimer = 0;
            WHOLE_DATA.soal_type5 = [];
            currentIteration = 0;
            totalIndex = 0;
            maxSoalInOneIteration = 7;

            secound = 0; 
            arrayJawaban = [];
            arraySoal = [];
            soalType5 = [];
            saveToObj5 = {};
            saveSoalType5 = {};   

            phaserJSON = game.cache.getJSON('soal');
            totalIteration = Math.ceil(phaserJSON.soals.length/maxSoalInOneIteration)
            mulaiTimer=false;



            this.setSoal(currentIteration);

            this.buttonNext = game.add.button(game.width * 0.75 , game.height * 0.92, 'ButtonSheet', this.nextSoal, this, "Next_s", "Next_s", "Next_s_act");
            this.buttonNext.scale.setTo(2);
            this.buttonNext.anchor.setTo(0.5);  
            this.buttonNext.visible = false;

            var bgTextJumlahSoal = game.add.sprite(game.width*0.01,game.height*0.01,'ButtonSheet','BG Task indicator');
            bgTextJumlahSoal.scale.setTo(2);

            styleBold = { font: "Open Sans",fontSize: "24px", fill: "#ffffff", align: "center",stroke:"#ffffff",strokeThickness:1};     
            textJumlahSoal = game.add.text(game.width * 0.09, game.height * 0.015, (currentIteration+1)+'/'+totalIteration,styleBold);
            textJumlahSoal.anchor.set(0);

            var yaText = game.add.text(game.width * 0.72, game.height * 0.17,"ya",styleBold);
            var tidakText = game.add.text(game.width * 0.85, game.height * 0.17,"tidak",styleBold);

            style = { font: "32px", fill: "#000", align: "center"};                  

            textTime = game.add.text(game.width * 0.92, game.height* 0.03, '0',styleBold);
            textTime.anchor.set(0.5);
            radialProgress.create();
            radialProgress.startRadial(phaserJSON.waktu);

            maxTimer = phaserJSON.waktu;
            timer = game.time.create(false);
            timer.loop(1000, this.updateCounter, this);
            timer.start();

            textTime.text = phaserJSON.waktu;
        },
        update : function(){
            if(this.isInit == false)
                return;

            radialProgress.update();
        },
        setSoal : function(iteration)
        {
            arrJawabanType5 = [];
            var styleSoal = { font: "Open Sans",fontSize: "24px", fill: "#ffffff", align: "left",wordWrapWidth : game.width*0.4, wordWrap: true}; 
            var arrJawab = [this.jawab1,this.jawab2,this.jawab3,this.jawab4,this.jawab5,this.jawab6,this.jawab7];
            
            for(var j= maxSoalInOneIteration * iteration ; j < maxSoalInOneIteration * (iteration + 1) && j < phaserJSON.soals.length;j++)
            {
                var imageBox1 = game.add.image(game.width * 0.05, game.height*0.25 + game.height*0.085 * (j - (maxSoalInOneIteration * iteration)), 'ButtonSheet','RIASEC BG');
                var textJawaban1 = game.add.text(game.width*0.17, imageBox1.y, phaserJSON.soals[j - (maxSoalInOneIteration * iteration)].text, styleSoal);

                var buttonTrue1 = game.add.button(imageBox1.width*2 + imageBox1.x + game.width*0.08, imageBox1.y, 'ButtonSheet', null,null, "RIASEC Opt_grey","RIASEC Opt_grey","RIASEC Opt_grey");
                var buttonFalse1 = game.add.button((buttonTrue1.width*2)+buttonTrue1.x + game.width*0.01, imageBox1.y, 'ButtonSheet', null, null, "RIASEC Opt_grey","RIASEC Opt_grey","RIASEC Opt_grey");
                
                var falseChoice = game.add.sprite(buttonFalse1.x,buttonFalse1.y,'ButtonSheet','RIASEC Opt_n');
                var trueChoice = game.add.sprite(buttonTrue1.x,buttonTrue1.y,'ButtonSheet','RIASEC Opt_y');
                
                trashCan.push(imageBox1);
                trashCan.push(textJawaban1);
                trashCan.push(buttonTrue1);
                trashCan.push(buttonFalse1);
                trashCan.push(falseChoice);
                trashCan.push(trueChoice);

                arrJawabanType5.push(null);

                falseChoice.scale.setTo(2);
                falseChoice.anchor.setTo(0.5);
                trueChoice.scale.setTo(2);
                trueChoice.anchor.setTo(0.5);
                buttonTrue1._ = this;
                buttonFalse1._ = this;

                buttonTrue1.ansFrame = trueChoice;
                buttonFalse1.ansFrame = falseChoice;

                buttonTrue1.onInputUp.add(this.hitButtonTrue, buttonTrue1);
                buttonFalse1.onInputUp.add(this.hitButtonFalse, buttonFalse1);

                buttonTrue1.negatifButton = falseChoice;
                buttonFalse1.negatifButton = trueChoice;

                buttonTrue1.index = j-(maxSoalInOneIteration * iteration);
                buttonFalse1.index = j-(maxSoalInOneIteration * iteration);

                trueChoice.visible = false;
                falseChoice.visible = false;

                buttonTrue1.jawab = arrJawab[j-(maxSoalInOneIteration * iteration)];

                buttonTrue1.scale.setTo(2);
                buttonFalse1.scale.setTo(2);
                
                imageBox1.scale.setTo(2);
                imageBox1.anchor.x = 0;
                imageBox1.anchor.y = 0.5;
                
                buttonTrue1.anchor.setTo(0.5);
                buttonFalse1.anchor.setTo(0.5);

                textJawaban1.anchor.y = 0.5;
                game.add.tween(textJawaban1).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true,200*j);                
            }

        },

        updateCounter:function(){
            textTime.text = ((maxTimer-1) - currentTimer);

            currentTimer ++;

            if(currentTimer  == maxTimer)
            {  
                currentTimer = 0;
                this.nextSoal();
            }

           
        },

        destroySoal:function(){
            for(var i=0;i<trashCan.length;i++)
            {
                trashCan[i].destroy();
            }
            //empty trashcan
            trashCan = [];
        },       

        onButtonDown: function(){
        },  

        hitButtonTrue: function(){ 
            this.ansFrame.visible = true;
            this.negatifButton.visible = false;                            
            this.jawab ="true";

            arrJawabanType5[this.index] = true;
            if(this._.checkForFinish())
                this._.buttonNext.visible = true;
        },
        hitButtonFalse: function(){
            this.ansFrame.visible = true;                               
            this.jawab ="false";
            this.negatifButton.visible = false;
            arrJawabanType5[this.index] = false;

            if(this._.checkForFinish())
                this._.buttonNext.visible = true;
        },

        checkForFinish: function(){
            for(var i=0;i<arrJawabanType5.length;i++)
            {
                if(arrJawabanType5[i] === null)
                    return false;
            }      
            return true;
        },

        nextSoal: function(){
            textTime.text = phaserJSON.waktu;
            this.destroySoal();
            this.buttonNext.visible = false;
            currentTimer = 0;
            for(var j= maxSoalInOneIteration * currentIteration ; j < maxSoalInOneIteration * (currentIteration + 1) && j < phaserJSON.soals.length;j++)
            {
                var pertanyaan = {};
                var jawaban;

                pertanyaan.text = phaserJSON.soals[j].text;
                pertanyaan.id = phaserJSON.soals[j].id;
                jawaban = arrJawabanType5[j -(maxSoalInOneIteration * currentIteration)];

                savedData = {};
                savedData.pertanyaan = pertanyaan;
                savedData.jawaban = jawaban;
                WHOLE_DATA.soal_type5.push(savedData);
            }

            if(currentIteration < totalIteration){
                currentIteration++;
            }
            if(currentIteration == totalIteration){
                this.nextScene();
                radialProgress.stopAndDestroy();
                return;
            }
            radialProgress.stopAndDestroy();
            radialProgress.create();
            radialProgress.startRadial(phaserJSON.waktu);
                
           this.setSoal(currentIteration);
           textJumlahSoal.setText((currentIteration+1)+'/'+totalIteration);
        },

        nextScene: function(){            
            nextState();
        }
}