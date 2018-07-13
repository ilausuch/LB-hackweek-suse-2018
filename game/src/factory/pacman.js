class Pacman extends Enemy {

  constructor(scene, posX, posY) {
    super(scene, 'pacman');
    this.posX = posX;
    this.posY = posY;
    this.collide_with_walls = true;
    this.persistent_attack = false;
    this.turn_back_if_attacked = true;

    this.configure("pacman")
  }

  preload() {
    super.preload();

    this.scene.load.spritesheet("pacman", 'assets/img/characters/pacman/walk.png', {
      frameWidth: 32,
      frameHeight: 32,
      margin: 0,
      spacing: 0
    });
  }

  createAnimations() {
    super.createAnimations();

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
    this.object.setBounce(0 , 0);
    this.object.setCollideWorldBounds(false);
    this.object.setGravityY(1000);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.play("pacman");
    this.object.anims.play();
    this.object.owner = this;
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
    var collision_loop = this.scene.objects.scenario.fx_collision_loop;
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
    this.explosion = this.scene.add.sprite(0, 0, 'explosion').setScale(1).play("explosion_play");
    this.explosion.x = this.object.body.x;
    this.explosion.y = this.object.body.y + this.object.body.height;
  }

}
