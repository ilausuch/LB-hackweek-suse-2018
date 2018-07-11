class Mario extends BaseObject {

  constructor(scene, posX, posY, speed) {
    super(scene, 'mario');
    this.animation = undefined;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.collide_with_walls = true;
  }

  preload() {
    //this.scene.load.image('hero', '/assets/img/characters/hero/base.png');
    /*
    this.scene.load.spritesheet("hero_attack", 'assets/img/characters/hero/attack.png', {
      frameWidth: 94,
      frameHeight: 35,
      margin: 0,
      spacing: 0
    });*/
    //sprites attack: 94x35

    this.scene.load.spritesheet("mario", 'assets/img/characters/mario/walk.png', {
      frameWidth: 44.5,
      frameHeight: 48,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    console.log("mario:create");
    this.prepareSounds();
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
  };

  createAnimations() {
    /*
    this.scene.anims.create({
      key: 'hero_attack',
      frames: this.scene.anims.generateFrameNumbers('hero_attack', {
        start: 0,
        end: 9
      }),
      scale: 1,
      frameRate: 15,
      repeat: 0
    });*/
    this.scene.anims.create({
      key: 'mario',
      frames: this.scene.anims.generateFrameNumbers('mario', {
        start: 0,
        end: 2
      }),
      scale: 1,
      frameRate: 5,
      repeat: -1
    });
  }

  prepareObjects() {
    this.object = this.scene.physics.add.sprite(0, 0, 'mario');
    this.object.setVelocity(this.speed, 0);
    this.object.setBounce(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.play("mario");
    this.object.anims.play();
    this.object.owner = this;
  }

  prepareSounds(){

  }

  prepareControls(){
  }

  postCreation() {
    var $this = this;
    this.scene.scenario.define_collisions(this.object, undefined, this.onCollideWalls);
    this.scene.scenario.define_collisions_platforms(this.object, this.onCollidePlatforms);
    setTimeout(function(){
      //$this.object.body.width = 50;
    })
  }

  onCollideWalls(a,b) {
    a.owner.speed = -1 * a.owner.speed;
    a.setVelocityX(a.owner.speed);
  }
  onCollidePlatforms(a,b) {
    var prob = Math.floor((Math.random() * 100) + 1);
    if (prob > 80) {
        //a.owner.speed = -1 * a.owner.speed;
        //a.setVelocityX(a.owner.speed);
        console.log(prob);
        a.owner.collide_with_walls = false;
        setTimeout(function(){
          a.owner.collide_with_walls = true;
        },800)
      }
      if (a.owner.collide_with_walls){
        a.owner.speed = -1 * a.owner.speed;
        a.setVelocityX(a.owner.speed);
      }
  }


  update() {
    var $this = this;
    if (this.object.body.velocity.x >0) this.object.flipX = false;
    else this.object.flipX = true;
  }

}
