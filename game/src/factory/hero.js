class Hero extends BaseObject {

  constructor(scene) {
    super(scene, 'hero');
    this.animation = undefined;
  }

  preload() {
    this.scene.load.image('hero', '/assets/img/characters/hero/base.png');
    this.scene.load.spritesheet("hero_attack", 'assets/img/characters/hero/attack.png', {
      frameWidth: 94,
      frameHeight: 35,
      margin: 0,
      spacing: 0
    });
    //sprites attack: 94x35
  }

  create() {
    console.log("hero:create");
    this.prepareSounds();
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
    this.scene.anims.create({
      key: 'hero_attack',
      frames: this.scene.anims.generateFrameNumbers('hero_attack', {
        start: 0,
        end: 9
      }),
      scale: 1,
      frameRate: 15,
      repeat: 0
    });
    this.scene.anims.get("hero_attack").hideOnComplete = true;
    //this.attack_sprites = this.scene.physics.add.sprite(this.getHeadPosition()[0], this.getHeadPosition()[1], 'hero_attack');
    this.attack_sprites = this.scene.physics.add.sprite(0, 0, 'hero_attack');
    this.attack_sprites.play("hero_attack");
  };

  createAnimations() {
  }

  prepareObjects() {
    this.heroObj = this.scene.physics.add.sprite(150, 0 , 'hero');
    this.heroObj.setVelocity(0, 200);
    this.heroObj.setBounce(0, 0);
    this.heroObj.setCollideWorldBounds(true);
    this.heroObj.setGravityY(1000);
    this.heroObj.y = this.scene.objects.scenario.data.floor - this.heroObj.height;
  }

  prepareSounds(){

  }

  prepareControls(){
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.keyboard.on('keydown_SPACE', function(event) {
        if (this.heroObj.body.velocity.y == 0)
          console.log("ATTACK!");
          var pos = this.getHeadPosition();
          if (! this.attack_sprites.anims.isPlaying) {
            //this.attack_sprites = this.scene.physics.add.sprite(pos[0], pos[1], 'hero_attack');
            this.attack_sprites.setVisible(true);
            this.attack_sprites.play("hero_attack");
          }
      }, this);
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.heroObj);
  }


  update() {
    this.heroObj.setVelocityX(0);
    if (this.cursors.left.isDown)
    {
        this.heroObj.setVelocityX(-300);
        this.heroObj.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.heroObj.setVelocityX(300);
        this.heroObj.flipX = false;
    }
    var pos = this.getHeadPosition();
    this.attack_sprites.x = pos[0];
    this.attack_sprites.y = pos[1];
    if (this.heroObj.flipX) this.attack_sprites.flipX = true;
    else this.attack_sprites.flipX = false;
  }

  getHeadPosition() {
    var pos = [this.heroObj.x, this.heroObj.y];
    if (this.heroObj.flipX) {
        pos[0] -= 57;
    }
    else {
        pos[0] += 56;
    }
    return pos;
  }

}
