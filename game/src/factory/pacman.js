class Pacman extends BaseObject {

  constructor(scene, posX, posY, speed) {
    super(scene, 'pacman');
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.collide_with_walls = true;
  }

  preload() {
    this.scene.load.spritesheet("pacman", 'assets/img/characters/pacman/walk.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    console.log("pacman:create");
    this.prepareSounds();
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
  };

  createAnimations() {
    this.scene.anims.create({
      key: 'pacman',
      frames: this.scene.anims.generateFrameNumbers('pacman', {
        frames: [0, 1, 2, 1]
      }),
      scale: 1,
      frameRate: 10,
      repeat: -1
    });
  }

  prepareObjects() {
    this.object = this.scene.physics.add.sprite(0, 0, 'pacman').setScale(1.2);
    this.object.setVelocity(this.speed, 0);
    this.object.setBounce(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.play("pacman");
    this.object.anims.play();
    this.object.owner = this;
  }

  prepareSounds(){

  }

  prepareControls(){
  }

  postCreation() {
    var $this = this;
    this.scene.scenario.define_collisions(this.object, this.onCollideFloor, this.onCollideWalls);
    setTimeout(function(){
      //$this.object.body.width = 50;
    })
  }

  onCollideFloor(a,b) {
    //console.log("Collide floor");
  }

  onCollideWalls(a,b) {
    console.log("COLLIDE");
    a.owner.speed = -1 * a.owner.speed;
    a.setVelocityX(a.owner.speed);
    console.log(a.owner.speed);
  }

  update() {
    if (this.speed > 0) {
      this.object.flipX = false;
    } else {
      this.object.flipX = true;
    }
  }

}
