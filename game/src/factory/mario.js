class Mario extends BaseObject {

  constructor(scene, posX, posY, speed) {
    super(scene, 'mario');
    this.animation = undefined;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.collide_with_walls = true;
    this.isAttacking = false;
    this.attackSpeed = 350;
  }

  preload() {
    //this.scene.load.image('hero', '/assets/img/characters/hero/base.png');

    this.scene.load.spritesheet("mario_attack", 'assets/img/characters/mario/attack.png', {
      frameWidth: 11,
      frameHeight: 11,
      margin: 0,
      spacing: 0
    });

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
    this.scene.anims.create({
      key: 'mario_attack',
      frames: this.scene.anims.generateFrameNumbers('mario_attack', {
        start: 0,
        end: 3
      }),
      scale: 1,
      frameRate: 15,
      repeat: -1
    });
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

    this.mario_attack = this.scene.physics.add.sprite(0, 0, 'mario_attack').setScale(1.5);
    this.mario_attack.setVelocity(this.attackSpeed, 0);
    this.mario_attack.setBounce(1, 0.6);
    this.mario_attack.setCollideWorldBounds(false);
    this.mario_attack.setGravityY(1000);
    this.mario_attack.x = 0;
    this.mario_attack.y = 0;
    this.mario_attack.play("mario_attack");
    this.mario_attack.anims.play();
    this.mario_attack.owner = this;
  }

  prepareSounds(){

  }

  prepareControls(){
  }

  postCreation() {
    var $this = this;
    this.scene.scenario.define_collisions(this.object, undefined, this.onCollideWalls);
    this.scene.scenario.define_collisions_platforms(this.object, this.onCollidePlatforms);
    this.scene.scenario.define_collisions(this.mario_attack, undefined, undefined, "floor");
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
    if (Math.floor((Math.random() * 100) + 1) > 50) {
      if (! this.isAttacking) {
        console.log("MARIO ATTACK!")
        this.isAttacking = true;
        this.attack();
        setTimeout(function(){
          $this.isAttacking = false;
        },4000)
      }
    }
  }

  attack() {
    this.mario_attack.setVelocity(0, 0);
    this.mario_attack.x = this.object.x;
    this.mario_attack.y = this.object.y - 25;
    var speed = this.attackSpeed;
    if (this.object.flipX) speed = - this.attackSpeed;
    this.mario_attack.setVelocity(speed, 0);

  }

}
