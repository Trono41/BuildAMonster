class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings
        
        this.aKey = null;
        this.dKey = null;
        this.fKey = null;
        this.sKey = null;

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 300;

        this.topLeftArmX = this.bodyX - 90;
        this.topLeftArmY = this.bodyY - 120;
        this.bottomLeftArmX = this.bodyX - 90;
        this.bottomLeftArmY = this.bodyY + 70;

        this.topRightArmX = this.bodyX + 90;
        this.topRightArmY = this.bodyY - 120;
        this.bottomRightArmX = this.bodyX + 90;
        this.bottomRightArmY = this.bodyY + 70;
        
        this.leftLegX = this.bodyX - 40;
        this.leftLegY = this.bodyY + 160;

        this.rightLegX = this.bodyX + 40;
        this.rightLegY = this.bodyY + 160;

        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 40;

        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 40;

        this.leftHornX = this.bodyX - 40;
        this.leftHornY = this.bodyY - 115;

        this.rightHornX = this.bodyX + 40;
        this.rightHornY = this.bodyY - 115;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_yellowE.png");

        // Create the arm sprites
        my.sprite.topLeftArm = this.add.sprite(this.topLeftArmX, this.topLeftArmY, "monsterParts", "arm_yellowC.png");
        my.sprite.topLeftArm.flipX = true;
        my.sprite.topLeftArm.flipY = true;
        my.sprite.bottomLeftArm = this.add.sprite(this.bottomLeftArmX, this.bottomLeftArmY, "monsterParts", "arm_yellowC.png");
        my.sprite.bottomLeftArm.flipX = true;
        my.sprite.topRightArm = this.add.sprite(this.topRightArmX, this.topRightArmY, "monsterParts", "arm_yellowC.png");
        my.sprite.topRightArm.flipY = true;
        my.sprite.bottomRightArm = this.add.sprite(this.bottomRightArmX, this.bottomRightArmY, "monsterParts", "arm_yellowC.png");

        // Create the leg sprites
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_yellowA.png");
        my.sprite.leftLeg.flipX = true;
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_yellowA.png");

        // Create the face sprites
        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_psycho_dark.png");
        my.sprite.smilingMouth = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthI.png");
        my.sprite.fangMouth = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangMouth.flipY = true;

        // Create the detail sprites
        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_white_horn_large.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_white_horn_large.png");

        // Assign keyboard inputs to aKey and dKey variables
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Change to fang mouth
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        fKey.on('down', (key, event) => {
            my.sprite.smilingMouth.visible = false;
            my.sprite.fangMouth.visible = true;
        });

        // Change to smile mouth
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        sKey.on('down', (key, event) => {
            my.sprite.fangMouth.visible = false;
            my.sprite.smilingMouth.visible = true;
        });

        // Hide fang mouth
        my.sprite.fangMouth.visible = false;
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

       // Polling input move left
       if(this.aKey.isDown) {
            my.sprite.body.x -= 0.5;
            my.sprite.topLeftArm.x -= 0.5;
            my.sprite.bottomLeftArm.x -= 0.5;
            my.sprite.topRightArm.x -= 0.5;
            my.sprite.bottomRightArm.x -= 0.5;
            my.sprite.leftLeg.x -= 0.5;
            my.sprite.rightLeg.x -= 0.5;
            my.sprite.eye.x -= 0.5;
            my.sprite.smilingMouth.x -= 0.5;
            my.sprite.fangMouth.x -= 0.5;
            my.sprite.leftHorn.x -= 0.5;
            my.sprite.rightHorn.x -= 0.5;
       }

       // Polling input move right
       if(this.dKey.isDown) {
            my.sprite.body.x += 0.5;
            my.sprite.topLeftArm.x += 0.5;
            my.sprite.bottomLeftArm.x += 0.5;
            my.sprite.topRightArm.x += 0.5;
            my.sprite.bottomRightArm.x += 0.5;
            my.sprite.leftLeg.x += 0.5;
            my.sprite.rightLeg.x += 0.5;
            my.sprite.eye.x += 0.5;
            my.sprite.smilingMouth.x += 0.5;
            my.sprite.fangMouth.x += 0.5;
            my.sprite.leftHorn.x += 0.5;
            my.sprite.rightHorn.x += 0.5;
   }
    }

}