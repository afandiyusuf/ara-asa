Scene.soal_type4 = function (game) {

        var phaserJSON;
        var arraySoal;
        var i; // i adalah nomor soal yang ditampilkan
        var index; // jumlah array soal
        var totalIndex; // angka yg dibutuhkan untuk bisa lanjut ke tipe soal berikutnya
        var jumlahSoal;
        var timer;
        var secound;
        //var loop;

};

Scene.soal_type4.prototype = {
        
        preload: function(){
                
            game.load.image('nextButton', './assets/nextButton.png');
            game.load.image('box','./assets/box.png');             
            game.load.json('soal', './json/'+arrJsonData[currentJsonIndex]);
            currentJsonIndex++;
        },

        create: function(){

                i=0;
                totalIndex=0; 
                secound=0; 
                arrayJawaban=[];
                arraySoal=[];
                soalType4=[];
                saveToObj4={};
                saveSoalType4={};      

                phaserJSON = game.cache.getJSON('soal');
                jumlahSoal = phaserJSON.soals.length;
                index = jumlahSoal-1;

                arraySoal = Phaser.ArrayUtils.numberArray(0,index);
                Phaser.ArrayUtils.shuffle(arraySoal);

                style = { font: "32px", fill: "#000", align: "center"};  

                text = game.add.text(game.world.centerX,150,"soal pilihan ganda",style);
                text.anchor.set(0.5);

                textTime = game.add.text(game.world.centerX+300,game.world.centerY-600, 'timer : 0',style);
                textTime.anchor.set(0.5);

                textSoal = game.add.text(game.world.centerX, game.world.centerY-400, phaserJSON.soals[arraySoal[i]].pertanyaan, style);
                textSoal.anchor.set(0.5);
                
                button1 = game.add.button(game.world.centerX, game.world.centerY-100, 'box', this.hitButton1, this, 2, 1, 0);
                textJawaban1 = game.add.text(game.world.centerX, game.world.centerY-100, phaserJSON.soals[arraySoal[i]].pilihan[0], style);       
                             
                button1.anchor.setTo(0.5);
                textJawaban1.anchor.set(0.5);
                button1.onInputUp.add(this.onButtonUp1, this);
                button1.onInputDown.add(this.onButtonDown1, this);

                button2 = game.add.button(game.world.centerX, game.world.centerY+200, 'box', this.hitButton2, this, 2, 1, 0);
                textJawaban2 = game.add.text(game.world.centerX, game.world.centerY+200, phaserJSON.soals[arraySoal[i]].pilihan[1], style);                
              
                button2.anchor.setTo(0.5);
                textJawaban2.anchor.set(0.5);  
                button2.onInputUp.add(this.onButtonUp1, this);
                button2.onInputDown.add(this.onButtonDown2, this);

                buttonNext = game.add.button(game.world.centerX+100, game.world.centerY+400, 'nextButton', this.nextSoal, this, 2, 1, 0);
                buttonNext.scale.setTo(0.5);
                buttonNext.visible = false;
                buttonNext.inputEnabled = false;
                buttonNext.onInputUp.add(this.onButtonUp3, this);
                buttonNext.onInputDown.add(this.onButtonDown3, this);        

                textJumlahSoal = game.add.text(game.world.centerX+300, game.world.centerY+600, (i+1)+'/'+jumlahSoal+' Pertanyaan',style);
                textJumlahSoal.anchor.set(0.5); 

                waktu = (phaserJSON.waktu)*1000;
                timer = game.time.create(false);
                timer.loop(waktu, this.nextSoal, this);
                timer.start();            
        },

        update: function(){
            textTime.setText('timer : '+secound);
            if(timer.duration.toFixed(0)>0){
                secound = Math.floor(timer.duration.toFixed(0)/1000)+1;
            }

            //console.log(secound);
        },

        onButtonUp1: function(){
                
                button1.scale.set(1);
                button2.scale.set(1);                
                //secound = timer.duration.toFixed(0)/1000;
                //textTime.visible = true;
        },

        onButtonUp3: function(){
                
                buttonNext.scale.set(0.5);
                timer.loop(waktu, this.nextSoal, this);
                timer.start();
        },

        onButtonDown1: function(){
                
                button1.scale.set(0.8);
        },

        onButtonDown2: function(){
                
                button2.scale.set(0.8);
        },

        onButtonDown3: function(){
                
                buttonNext.scale.set(0.4);
                timer.stop();
        },

        hitButton1: function(){                               

            button1.tint=0x00ff00;
            button2.tint=0xffffff;
            buttonNext.visible = true;
            buttonNext.inputEnabled = true;
            jawab=phaserJSON.soals[arraySoal[i]].pilihan[0];

        },

        hitButton2: function(){      
            
            button1.tint=0xffffff;
            button2.tint=0xff0000;
            buttonNext.visible = true;
            buttonNext.inputEnabled = true;
            jawab=phaserJSON.soals[arraySoal[i]].pilihan[1];

        },

        nextSoal: function(){
            terjawab=true;
            this.randomSoal();      
        },

        randomSoal: function(){

            if(terjawab)
            {
                terjawab=false;
                soalKuis=phaserJSON.soals[arraySoal[i]].pertanyaan;
                pilihan=jawab;
                saveToObj4={soalKuis,jawaban:pilihan};
                soalType4.push(saveToObj4);
                saveSoalType4={soalType4};
                console.log(saveSoalType4);
            }
            else
            {
                terjawab=false;
                soalKuis=phaserJSON.soals[arraySoal[i]].pertanyaan;
                saveToObj4={soalKuis,jawaban:null};
                soalType4.push(saveToObj4);
                saveSoalType4={soalType4};
                console.log(saveSoalType4);
            }

            textJumlahSoal.setText((i+2)+'/'+jumlahSoal+' Pertanyaan');
            totalIndex++; 

            if(i<index)
                i++;
            if(totalIndex==jumlahSoal)
                this.nextScene();
                

            textSoal.setText(phaserJSON.soals[arraySoal[i]].pertanyaan);
            textJawaban1.setText(phaserJSON.soals[arraySoal[i]].pilihan[0]);
            textJawaban2.setText(phaserJSON.soals[arraySoal[i]].pilihan[1]);

            buttonNext.visible = false;
            buttonNext.inputEnabled = false;  
            
            button1.tint=0xffffff;
            button2.tint=0xffffff; 
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