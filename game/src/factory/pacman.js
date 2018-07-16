class Pacman extends Enemy {

  constructor(scene, posX, posY) {
    super(scene, 'pacman');
    this.posX = posX;
    this.posY = posY;
    this.collide_with_walls = true;
    this.persistent_attack = false;
    this.turn_back_if_attacked = true;

    this.puntuation = 50;
    this.speed =  100;
    this.pain = 0.2;
    this.energy = 2;
    this.persistent_attack = true;

    this.configure("pacman");
    this.create();
  }

  create () {

    this.object = this.scene.physics.add.sprite(0, 0, 'pacman').setScale(1.2);
    this.object.setVelocity(this.speed, 0);
    this.object.setBounce(0 , 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    this.object.x = this.posX;
    this.object.y = this.posY;

    this.object.play("pacman_run");
    this.object.anims.play();
    this.object.owner = this;

    this.setup();
  }

  prepareSounds(){

  }

  direction(){
    return this.object.flipX ? -1 : 1;
  }

  onCollideWalls() {
    this.object.flipX = !this.object.flipX;
  }

  attackToHero(hero){
    gameStatus.decrease_energy(this.id, this.pain);
    var collision_loop = this.scene.fx_collision_loop;
    if (! collision_loop.isPlaying) collision_loop.resume();
    else {
      var $this = this;
      setTimeout(function(){
        collision_loop.pause()
      },500)
    }
    if (!this.persistent_attack)
      this.object.flipX = !this.object.flipX;
  }


  update() {
    try{
      this.object.setVelocityX(this.speed * this.direction())
    }catch(e){}
  }

  onAttackedByHero(hero){
    if (this.turn_back_if_attacked){
      this.object.flipX = hero.object.body.x < this.object.body.x;
    }
  }

  launch_explosion(){
    this.explosion = this.scene.add.sprite(0, 0, 'smoke').setScale(1).play("smoke_play");
    this.explosion.x = this.object.body.x;
    this.explosion.y = this.object.body.y + this.object.body.height;
  }

}

class PacmanFactory extends BaseObject{
  constructor(scene){
    super(scene, PacmanFactory)
  }

  preload() {
    console.log("pacmanFactory", "preload");
    this.scene.load.spritesheet("pacman", 'assets/img/characters/pacman/walk.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 2
    });
  }

  create() {
    console.log("pacmanFactory", "create");

    this.scene.anims.create({
      key: 'pacman_run',
      frames: this.scene.anims.generateFrameNumbers('pacman', {
        frames: [0, 1, 2, 1]
      }),
      scale: 1,
      frameRate: 10,
      repeat: -1
    });
  }
}
