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
    this.attack_sprites = this.scene.physics.add.sprite(0, 0, 'hero_attack').setScale(0.9);
    this.attack_sprites.play("hero_attack");
  };

  createAnimations() {
  }

  prepareObjects() {
    this.object = this.scene.physics.add.sprite(150, 0 , 'hero').setScale(0.9);
    this.object.setVelocity(0, 200);
    this.object.setBounce(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    this.object.y = this.scene.objects.scenario.data.floor - this.object.height;
  }

  prepareSounds(){

  }

  prepareControls(){
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.keyboard.on('keydown_SPACE', function(event) {
          var pos = this.getHeadPosition();
          if (! this.attack_sprites.anims.isPlaying) {
            this.attack_sprites.setVisible(true);
            this.attack_sprites.play("hero_attack");
          }
      }, this);
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.object);
    var $this = this;
    setTimeout(function(){
      //$this.object.body.width = 50;
    })
  }


  update() {
    this.object.setVelocityX(0);
    if (this.cursors.up.isDown && this.object.body.velocity.y == 0)
    {
        this.object.setVelocityY(-500);
    }
    if (this.cursors.left.isDown)
    {
        this.object.setVelocityX(-300);
        this.object.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.object.setVelocityX(300);
        this.object.flipX = false;
    }
    var pos = this.getHeadPosition();
    this.attack_sprites.x = pos[0];
    this.attack_sprites.y = pos[1];
    if (this.object.flipX) this.attack_sprites.flipX = true;
    else this.attack_sprites.flipX = false;
  }

  getHeadPosition() {
    var pos = [this.object.x, this.object.y];
    if (this.object.flipX) {
        pos[0] -= 51.5;
    }
    else {
        pos[0] += 50.5;
    }
    return pos;
  }

}
