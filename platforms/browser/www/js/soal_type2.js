Scene.soal_type2 = function (game) {

        var phaserJSON;
        var arraySoal;
        var arrayJawaban;
        var i; // i adalah nomor soal yang ditampilkan
        var index; // jumlah array soal
        var totalIndex; // angka yg dibutuhkan untuk bisa lanjut ke tipe soal berikutnya
        var jumlahSoal;
        var benar;
        var salah;
        var clicked;
        var timer;
        var secound;

};

Scene.soal_type2.prototype = {
        
        preload: function(){
                
            game.load.image('box','./assets/box.png');
            game.load.image('boxClick','./assets/boxClick.png');
            game.load.json('soal', './json/'+arrJsonData[currentJsonIndex]);
            currentJsonIndex++;
        },

        create: function(){
                WHOLE_DATA.soal_type2 = [];

                i=0;
                totalIndex=0;
                benar=0;
                salah=0; 
                clicked=0; 
                secound=0;   
                arrayJawaban=[];
                arraySoal=[];      
                soalType2=[];
                saveToObj2={};
                saveSoalType2={};

                phaserJSON = game.cache.getJSON('soal');
                jumlahSoal = phaserJSON.soals.length;
                index = jumlahSoal-1;

                arraySoal = Phaser.ArrayUtils.numberArray(0,index);
                Phaser.ArrayUtils.shuffle(arraySoal);

                arrayJawaban = Phaser.ArrayUtils.numberArray(0,1);
                Phaser.ArrayUtils.shuffle(arrayJawaban);

                style = { font: "32px", fill: "#000", align: "center"};     
                text = game.add.text(game.world.centerX,150,"soal pilihan ganda",style);
                text.anchor.set(0.5);

                textSoal = game.add.text(game.world.centerX, game.world.centerY-400, phaserJSON.soals[arraySoal[i]].pertanyaan, style);
                textSoal.anchor.set(0.5);
                
                button1 = game.add.button(game.world.centerX, game.world.centerY-100, 'box', this.hitButton1, this, 2, 1, 0);
                imageButton1 = game.add.image(game.world.centerX, game.world.centerY-100, 'boxClick');
                textJawaban1 = game.add.text(game.world.centerX, game.world.centerY-100, phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[0]].text, style);        
                
                button1.anchor.setTo(0.5);
                imageButton1.anchor.setTo(0.5);
                imageButton1.scale.setTo(0.8);
                imageButton1.visible = false;
                textJawaban1.anchor.set(0.5);                
                button1.onInputDown.add(this.onButtonDown1, this);
                button1.onInputUp.add(this.onButtonUp1, this);

                button2 = game.add.button(game.world.centerX, game.world.centerY+200, 'box', this.hitButton2, this, 2, 1, 0);
                imageButton2 = game.add.image(game.world.centerX, game.world.centerY+200, 'boxClick');        
                textJawaban2 = game.add.text(game.world.centerX, game.world.centerY+200, phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[1]].text, style);
                
                button2.anchor.setTo(0.5);
                imageButton2.anchor.setTo(0.5);
                imageButton2.scale.setTo(0.8);
                imageButton2.visible = false;
                textJawaban2.anchor.set(0.5);
                button2.onInputDown.add(this.onButtonDown2, this);
                button2.onInputUp.add(this.onButtonUp2, this);                

                textJumlahSoal = game.add.text(game.world.centerX+300, game.world.centerY+600, (i+1)+'/'+jumlahSoal+' Pertanyaan',style);
                textJumlahSoal.anchor.set(0.5);

                textTime = game.add.text(game.world.centerX+300,game.world.centerY-600, 'timer : 0',style);
                textTime.anchor.set(0.5);

                waktu = (phaserJSON.waktu)*1000;
                timer = game.time.create(false); 
                timer.loop(waktu, this.randomSoal, this);
                timer.start();
        },

        update: function(){

        textTime.setText('timer : '+secound);
            if(timer.duration.toFixed(0)>0){
                secound = Math.floor(timer.duration.toFixed(0)/1000)+1;
            }   

    },

        hitButton1: function(){
            terjawab=true;
            jawab=phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[0]];
            this.randomSoal();                                    

        },

        hitButton2: function(){
            terjawab=true;
            jawab=phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[1]];
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
                jawaban = jawab;

            }
            else
            {
                terjawab=false;
                jawaban = null;
            }

            textJumlahSoal.setText((i+2)+'/'+jumlahSoal+' Pertanyaan');
            totalIndex++; 
            Phaser.ArrayUtils.shuffle(arrayJawaban);
            
            WHOLE_DATA.soal_type2[i] = {};
            WHOLE_DATA.soal_type2[i].pertanyaan = pertanyaan;
            WHOLE_DATA.soal_type2[i].jawaban = jawaban;

            if(i<index){
                i++;
            }
            if(totalIndex==jumlahSoal){
                this.nextScene();
                return;
            }
                

            textSoal.setText(phaserJSON.soals[arraySoal[i]].pertanyaan);
            textJawaban1.setText(phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[0]].text);
            textJawaban2.setText(phaserJSON.soals[arraySoal[i]].pilihan[arrayJawaban[1]].text);
        },

        onButtonUp1: function(){
            button1.scale.set(1);
            imageButton1.visible = false;
            timer.loop(waktu, this.hitButton1, this);
            timer.start();
        },

        onButtonDown1: function(){
            button1.scale.set(0.8);
            imageButton1.visible = true;
            timer.stop();
        },

        onButtonUp2: function(){
            button2.scale.set(1);
            imageButton2.visible = false;
            timer.loop(waktu, this.hitButton2, this);
            timer.start();
        },

        onButtonDown2: function(){
            button2.scale.set(0.8);
            imageButton2.visible = true;
            timer.stop();
        },

        nextScene: function(){            
            this.fade('soal_type5');
        },

        fade: function (nextState)     
        {        
                var spr_bg = this.game.add.graphics(0, 0);        
                spr_bg.beginFill(this.fadeColor, 1);        
                spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
                spr_bg.alpha = 0;        
                spr_bg.endFill();        
                this.nextState = nextState;        
                s = this.game.add.tween(spr_bg)        
                s.to({ alpha: 1 }, 500, null)        
                s.onComplete.add(this.changeState, this)        
                s.start();    
        },    

        changeState: function ()     
        {        
                this.game.state.start(this.nextState);        
                this.fadeOut();    
        },    

        fadeOut: function ()     
        {        
                var spr_bg = this.game.add.graphics(0, 0);        
                spr_bg.beginFill(this.fadeColor, 1);        
                spr_bg.drawRect(0, 0, this.game.width, this.game.height);        
                spr_bg.alpha = 1;        
                spr_bg.endFill();        
                s = this.game.add.tween(spr_bg)        
                s.to({ alpha: 0 }, 600, null)        
                s.start();    
        }

}