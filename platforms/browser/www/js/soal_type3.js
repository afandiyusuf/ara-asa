Scene.soal_type3 = function (game) {

        var phaserJSON;
        var arraySoal;
        var i; // i adalah nomor soal yang ditampilkan
        var index; // jumlah array soal
        var totalIndex; // angka yg dibutuhkan untuk bisa lanjut ke tipe soal berikutnya
        var jumlahSoal;
        var benar;
        var salah;
        var clicked;
        var timer;
        var secound;
        //var loop;

};
var terjawab;
Scene.soal_type3.prototype = {
        
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
            //game.load.image('nextButton', 'assets/AllAsset/Next_s.png');
            //game.load.image('trueButton','./assets/true.png');
            game.load.image('trueButton_clicked','assets/AllAsset/MBTI Opt_orange.png');
            game.load.image('falseButton','assets/AllAsset/MBTI Opt_orange.png');
            game.load.image('falseButton_clicked','assets/AllAsset/MBTI Opt_orange.png');             
            game.load.json('soal', './json/'+arrJsonData[currentJsonIndex]);
            currentJsonIndex++;
            game.load.image('bar1','assets/Button/Disc Opt_grey.png');
            game.load.image('bar2','assets/Button/Disc Opt_grey.png');

        },

        create: function(){
            this.isInit = false;
                generateIntroScene("pilihan_ganda",this);         
        },
        initThis: function(){
            this.isInit = true;
            WHOLE_DATA.soal_type3 = [];
            i=0;
            totalIndex=0;
            benar=0;
            salah=0; 
            clicked=0;  
            secound=0; 
            arraySoal=[];
            soalType3=[];
            saveToObj3={};
            saveSoalType3={};

            phaserJSON = game.cache.getJSON('soal');
            jumlahSoal = phaserJSON.soals.length;
            index = jumlahSoal-1;

            arraySoal = Phaser.ArrayUtils.numberArray(0,index);
            Phaser.ArrayUtils.shuffle(arraySoal);

            style = { font: "bold 35px Open Sans", fill: "#fff", align: "center",wordWrapWidth : game.width*0.8, wordWrap: true}; 
            style1 = { font: "bold 24px Open Sans", fill: "#fff", align: "center"}; 

            

            textSoal = game.add.text(game.world.centerX, game.world.height * 0.2, phaserJSON.soals[arraySoal[i]].pertanyaan, style);
            textSoal.anchor.set(0.5);

            bar1 = game.add.sprite(game.world.centerX,game.world.height * 0.45 ,'bar1');        
            button1 = game.add.button(game.world.centerX, game.world.height * 0.45, 'ButtonSheet', this.hitButton1, this,'MBTI Opt_grey','Disc Opt_grey','MBTI Opt_grey');
            imageButton1 = game.add.image(game.world.centerX,game.world.height * 0.45,'trueButton_clicked');            
            textJawaban1 = game.add.text(game.world.centerX, game.world.height * 0.45, phaserJSON.soals[arraySoal[i]].pilihan[0].text, style);

            bar1.anchor.setTo(0.5);
            bar1.scale.set(2);
            imageButton1.anchor.setTo(0.5);
            imageButton1.scale.set(2);                
            button1.anchor.setTo(0.5);
            button1.scale.set(2);
            textJawaban1.anchor.set(0.5);
            imageButton1.visible = false;
            button1.onInputUp.add(this.onButtonUp1, this);
            button1.onInputDown.add(this.onButtonDown1, this);

            bar2 = game.add.sprite(game.world.centerX, game.world.height * 0.60,'bar2');       
            button2 = game.add.button(game.world.centerX, game.world.height * 0.60, 'ButtonSheet', this.hitButton2, this,'MBTI Opt_grey','Disc Opt_grey','MBTI Opt_grey');                     
            imageButton2 = game.add.image(game.world.centerX, game.world.height * 0.60, 'falseButton_clicked');
            textJawaban2 = game.add.text(game.world.centerX, game.world.height * 0.60, phaserJSON.soals[arraySoal[i]].pilihan[1].text, style);

            bar2.anchor.setTo(0.5);
            bar2.scale.set(2);
            imageButton2.anchor.setTo(0.5);
            imageButton2.scale.set(2);               
            button2.anchor.setTo(0.5);
            button2.scale.set(2);
            textJawaban2.anchor.set(0.5);  
            imageButton2.visible = false;
            button2.onInputUp.add(this.onButtonUp1, this);
            button2.onInputDown.add(this.onButtonDown2, this);

            buttonNext = game.add.button(game.world.width * 0.5,game.world.height * 0.8, 'ButtonSheet', this.nextSoal, this,'Next_s','Next_s','Next_s_act');
            buttonNext.scale.setTo(2);
            buttonNext.visible = false;
            buttonNext.inputEnabled = false;
            buttonNext.onInputUp.add(this.onButtonUp3, this);
            buttonNext.onInputDown.add(this.onButtonDown3, this);        

            //add background for totalSoal indicator
            var bgTextJumlahSoal = game.add.sprite(game.width*0.01,game.height*0.01,'ButtonSheet','BG Task indicator');
            bgTextJumlahSoal.scale.setTo(2);
            //style jumlah soal
            styleBold = { font: "Open Sans",fontSize: "24px", fill: "#ffffff", align: "center",stroke:"#ffffff",strokeThickness:1};     
            textJumlahSoal = game.add.text(game.width * 0.09, game.height * 0.015, (i+1)+'/'+jumlahSoal,styleBold);
            textJumlahSoal.anchor.set(0);

            waktu = (phaserJSON.waktu)*1000;
            timer = game.time.create(false);
            timer.loop((phaserJSON.waktu)*1000, this.randomSoal, this);
            timer.start();

            textTime = game.add.text(game.width * 0.92, game.height* 0.03, 'timer : 0',style1);
            textTime.anchor.set(0.5);
            
            radialProgress.create();
            radialProgress.startRadial(phaserJSON.waktu);
        },
        update: function(){
            if(!this.isInit)
                return;

            radialProgress.update();
            textTime.setText(''+secound);
            if(timer.duration.toFixed(0)>0){
                secound = Math.floor(timer.duration.toFixed(0)/1000)+1;
            }

            //console.log(secound);
        },

        onButtonUp1: function(){
                
                button1.scale.set(2);
                button2.scale.set(2);                
                //secound = timer.duration.toFixed(0)/1000;
                //textTime.visible = true;
        },

        onButtonUp3: function(){
                
                buttonNext.scale.set(2);
                timer.loop(waktu, this.nextSoal, this);
                timer.start();
        },

        onButtonDown1: function(){
                
                button1.scale.set(2);
        },

        onButtonDown2: function(){
                button2.scale.set(2);
        },

        onButtonDown3: function(){
                
                buttonNext.scale.set(2);
                timer.stop();
        },

        hitButton1: function(){                               
            
            imageButton1.visible = true;
            imageButton2.visible = false;
            buttonNext.visible = true;
            buttonNext.inputEnabled = true;
            jawab=phaserJSON.soals[arraySoal[i]].pilihan[0];

        },

        hitButton2: function(){      
            
            imageButton1.visible = false;
            imageButton2.visible = true;
            buttonNext.visible = true;
            buttonNext.inputEnabled = true;
            jawab=phaserJSON.soals[arraySoal[i]].pilihan[1];

        },

        nextSoal: function(){
            terjawab=true;
            this.randomSoal();
        },

        randomSoal: function(){
            var pertanyaan = {};
            var jawaban = {};

            pertanyaan.text = phaserJSON.soals[arraySoal[i]].pertanyaan;
            pertanyaan.id = phaserJSON.soals[arraySoal[i]].id;

            if(terjawab)
            {
                terjawab=false;
                jawaban=jawab;
            }
            else
            {
                terjawab=false;
                jawaban = null;
            }

            WHOLE_DATA.soal_type3[i] = {};
            WHOLE_DATA.soal_type3[i].pertanyaan = pertanyaan;
            WHOLE_DATA.soal_type3[i].jawaban = jawaban;

            textJumlahSoal.setText((i+2)+'/'+jumlahSoal);
            totalIndex++; 

            if(i<index)
                i++;
            if(totalIndex==jumlahSoal){
                this.nextScene();
                radialProgress.stopAndDestroy();
                return;
            }
            
            radialProgress.stopAndDestroy();
            radialProgress.create();
            radialProgress.startRadial(phaserJSON.waktu);


            textSoal.setText(phaserJSON.soals[arraySoal[i]].pertanyaan);
            textJawaban1.setText(phaserJSON.soals[arraySoal[i]].pilihan[0].text);
            textJawaban2.setText(phaserJSON.soals[arraySoal[i]].pilihan[1].text);

            buttonNext.visible = false;
            buttonNext.inputEnabled = false; 
            imageButton1.visible = false;
            imageButton2.visible = false;
        },

        nextScene: function(){            
            nextState();
        }
}