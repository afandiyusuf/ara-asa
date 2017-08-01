
Scene.drawing = function (game) {

    var line;
    var setCircle;
    var circle;
    var circleIn;
    var lineStart;
    var lineEnd;

};

Scene.drawing.prototype = {

    preload: function(){

        setCircle = true;
        game.load.atlasJSONHash('ButtonSheet', 'Assets/Button/sheet/button_sheet.png', 'Assets/Button/sheet/button_sheet.json');
    },

    create: function() {
        
       // var style = { font: "32px", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };     
        //text = game.add.text(game.world.centerX,50,"menggambarkan lingkaran",style);
        //text.anchor.set(0.5);



        line = new Phaser.Line();
        circle = new Phaser.Circle();
        circleIn = new Phaser.Circle();

        game.input.onDown.add(this.mouseDown, this);
        game.input.onUp.add(this.mouseUp,this);

    },

    update: function() {

        if (setCircle)
        {            
            if (game.input.activePointer.isDown)
            {                
                lineEnd = line.end.set(game.input.activePointer.x, game.input.activePointer.y);
                line = new Phaser.Line(lineStart.x,lineStart.y,lineEnd.x,lineEnd.y);
                circle = new Phaser.Circle(game.input.activePointer.x, game.input.activePointer.y,(Math.abs(line.length)*2));
                circleIn = new Phaser.Circle(game.input.activePointer.x, game.input.activePointer.y,(Math.abs(line.length-sizeLine)*2));              
            }
            /*else if (game.input.activePointer.isUp)
            {
                setting = false;
                circle = new Phaser.Circle(game.input.activePointer.x, game.input.activePointer.y,100);
                console.log('circle create');
            }*/
        }
        //console.log(setCircle);

    },

    mouseDown: function(pointer) {

        //setting = true;
        if (setCircle)
            lineStart = line.start.set(pointer.x, pointer.y);

    },

    mouseUp: function(){
        if (setCircle){
            setCircle = false;   
            // mer. height, scale         
            button1 =  game.add.button(game.world.centerX,game.world.height * 0.85, 'ButtonSheet', this.nextScene, this, 'Next_l', 'Next_l', 'Next_l_act');
            button1.scale.setTo(2);
            // end // height, scale 
            button1.anchor.set(0.5);
            button.onInputDown.add(this.onButtonDown, this);
            button.onInputUp.add(this.onButtonUp, this);
        }
    },

    // mer.scale
    onButtonUp: function(){
        button.scale.set(2);
    },

    onButtonDown: function(){
        button.scale.set(2);
    // end // mer.scale
    },

    nextScene: function() {

        /*ukuran_garis=sizeLine;
        jari_lingkaran=line.length*2;
        posX_lingkaran=lineEnd.x;
        posY_lingkaran=lineEnd.y;
        saveObject  =   {
            ukuran_garis,
            jari_lingkaran,
            posX_lingkaran,
            posY_lingkaran
        }

        console.log(saveObject);*/
        
        nextState();

    },

    render: function() {
        /*if(setCircle)
            game.debug.geom(line,'#000');
        else*/
            game.debug.geom(circle,'#fff');
        game.debug.geom(circleIn,'#2d2f3b');
        //game.debug.rectangle(line);

    }
}
