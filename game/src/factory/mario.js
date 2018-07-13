class Mario extends Enemy {

  constructor(scene, posX, posY) {
    super(scene, 'mario');
    this.animation = undefined;
    this.posX = posX;
    this.posY = posY;
    this.collide_with_walls = true;
    this.isAttacking = false;

    var $this = this;
    this.disableAttack = true;
    setTimeout(function(){
      $this.disableAttack = false;
    },2000)

    this.waitNextJump = false;

    this.configure("mario");
    this.create();
  }

  create() {
    this.object = this.scene.physics.add.sprite(0, 0, 'mario');
    this.object.setVelocity(this.speed, 0);
    this.object.setBounce(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.play("mario_run");
    this.object.anims.play();
    this.object.owner = this;

    this.mario_attack = this.scene.physics.add.sprite(0, 0, 'mario_attack').setScale(1.5);
    this.mario_attack.setVelocity(this.attack_speed, 0);
    this.mario_attack.setBounce(1, 0.6);
    this.mario_attack.setCollideWorldBounds(false);
    this.mario_attack.setGravityY(1000);
    this.mario_attack.x = 0;
    this.mario_attack.y = 1000;
    this.mario_attack.play("mario_attack");
    this.mario_attack.anims.play();
    this.mario_attack.owner = this;

    this.setup();
  }

  prepareSounds(){

  }

  prepareControls(){
  }

  setup() {
    var $this = this;

    this.setup_coillide_with_walls();

    this.scene.scenario.define_collisions_platforms(this.object, function (a,b){
      $this.onCollidePlatforms();
    });

    this.scene.physics.add.overlap(this.mario_attack,  this.scene.objects.hero.object, function(a, b){
      $this.onAttackHit();
    });


    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.object, function(a, b){
      $this.attackToHero(b.owner);
    });

    this.scene.objects.hero.setup_attack_to_enemy(this, function(hero){
      $this.attackedByHero(hero);
    });

    this.injured_interval = setInterval(function(){
      $this.injured_counter = ($this.injured_counter + 1) % $this.total_energy;

      if ($this.injured_counter >= $this.energy)
        $this.object.setTint(0xFF0000);
      else
        $this.object.setTint(undefined);

    },40);
  }

  onCollideWalls() {
    this.speed = -1 * this.speed;
    this.object.setVelocityX(this.speed);
  }

  onCollidePlatforms() {
    var prob = Math.floor((Math.random() * 100) + 1);
    if (prob > 80) {
        this.collide_with_walls = false;
        setTimeout(function(){
          this.collide_with_walls = true;
        },800)
      }
      if (this.collide_with_walls){
        this.speed = -1 * this.speed;
        this.object.setVelocityX(this.speed);
      }
  }


  update() {
    try{
      var $this = this;


      //if (this.object.body.velocity.x >0)
      //  this.object.flipX = !this.object.flipX;

      if (this.object.body.velocity.x >0) this.object.flipX = false;
      else this.object.flipX = true;

      //Jumps
      if (this.object.body.velocity.y == 0 && Math.random() < this.jump_frequency) {
        this.object.setVelocityY(-500);
      }

      // Avoid blocks
      if (this.object.body.velocity.x == 0){
        var rand = Math.random()-0.5;
        var direction = rand > 0 ? 1 : -1
        this.object.setVelocityX(direction*200);
      }

      if (!this.disableAttack && !this.isAttacking && Math.random() < this.attack_frequency) {
        this.isAttacking = true;
        this.attack();
        setTimeout(function(){
          $this.isAttacking = false;
        },2000)
      }
    }catch(e){}
  }

  attack() {
    if (this.can_attack){
      this.mario_attack.setVelocity(0, 0);
      this.mario_attack.x = this.object.x;
      this.mario_attack.y = this.object.y - 25;
      var speed = this.attack_speed;
      if (this.object.flipX) speed = - this.attack_speed;
      this.mario_attack.setVelocity(speed, 0);
    }
  }

  onAttackHit(){
    gameStatus.decrease_energy( "mario_attack", this.attack_pain);
    this.isAttacking = false;
  }


  attackToHero(to){
    gameStatus.decrease_energy(this.id, this.pain);
    var collision_loop = this.scene.objects.scenario.fx_collision_loop;
    if (! collision_loop.isPlaying) collision_loop.resume();
    else {
      var $this = this;
      setTimeout(function(){
        collision_loop.pause()
      },500)
    }
  }

  attackedByHero(from){
    if (from.tongue_attack_timestamp !== this.last_attacked_by_hero_timestamp){
      this.last_attacked_by_hero_timestamp = from.tongue_attack_timestamp;

    this.energy = this.energy -1;

    if (this.energy <= 0){
      this.explosion = this.scene.add.sprite(0, 0, 'smoke').setScale(0.8).play("smoke_play");
      this.explosion.x = this.object.body.x + this.object.body.width/2;
      this.explosion.y = this.object.body.y + this.object.body.height/2;

      var plusPuntuation = new PlusPuntuation(this.scene, this.puntuation, this.object.body.x, this.object.body.y);

      this.die();
      this.scene.sound.play('fx_enemy_killed');

      }else{
        this.is_injured = true;
        this.injured_interval_counter = 5;
        this.onAttackedByHero(from);
      }
    }
  }
}

class MarioFactory extends BaseObject{
  constructor(scene){
    super(scene, "MarioFactory");
  }

  preload() {
    console.log("marioFactory", "preload");

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
    console.log("marioFactory", "create");

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
      key: 'mario_run',
      frames: this.scene.anims.generateFrameNumbers('mario', {
        start: 0,
        end: 2
      }),
      scale: 1,
      frameRate: 5,
      repeat: -1
    });
  }
}
