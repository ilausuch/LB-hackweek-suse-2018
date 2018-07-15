class Boss extends Enemy {

  constructor(scene, posX, posY) {
    super(scene, 'boss');
    this.posX = posX;
    this.posY = posY;
    this.collide_with_walls = true;
    this.persistent_attack = false;
    this.isAttacking = false;
    this.configure("boss")
    this.isMoving = false;
    this.can_hurt = true;
    this.hero_dead = false;
    console.log("Boss", "constructor");
    this.create();
    this.postCreation();
  }

  create() {
    console.log("Boss", "create");
    var $this = this;
    this.object = this.scene.physics.add.sprite(0, 0, 'boss').setScale(1);
    this.object.setVelocity(0, 0);
    this.object.setBounce(0 , 0);
    this.object.setCollideWorldBounds(false);
    this.object.setGravityY(0);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.owner = this;

    this.fire_logo = this.scene.physics.add.sprite(0, 0, 'fire_logo').setScale(1);
    this.fire_logo.setBounce(0 , 0);
    this.fire_logo.setCollideWorldBounds(false);
    this.fire_logo.setGravityY(0);
    this.fire_logo.owner = this;

    this.move_interval = setInterval(function(){
      $this.move();
    },5000)
    this.fire_interval = setInterval(function(){
      $this.fire();
    },1500)
  }

  postCreation() {
    console.log("Boss", "postCreation");
    var $this = this;
    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.object, function(a, b){
      $this.attackToHero(b.owner, "boss");
    });
    this.scene.physics.add.overlap(this.fire_logo, this.scene.objects.hero.object, function(a, b){
      $this.attackToHero(b.owner, "logo");
    });
  }

  attackToHero(hero, type = 'boss'){
    console.log("Boss", "attackToHero", type);
    if (type == "boss") {
      this.hero_dead = true;
      gameStatus.decrease_energy("boss_attack",1);
    } else if (type == "logo") {
      if (this.can_hurt) {
        gameStatus.decrease_energy("boss_logo_attack", this.pain);
        this.can_hurt = false;
        this.scene.sound.play('fx_hero_boss_damage');
      }
    }
  }

  move() {
    console.log("Boss", "move");
    var $this = this;
    this.isMoving = true;
    this.scene.tweens.add({
        targets: this.object,
        x: this.scene.objects.hero.object.x,
        ease: 'linear',
        duration: Math.abs(this.scene.objects.hero.object.x - this.object.x) / 800 * 1500,
        onComplete: function (){
          setTimeout(function(){
            $this.scene.tweens.add({
                targets: $this.object,
                y: $this.scene.objects.hero.object.y,
                ease: 'linear',
                duration: Math.abs($this.scene.objects.hero.object.y - $this.object.y) / 600 *1500,
                onComplete: function (){
                  $this.isMoving = false;
                }
              });
            },300)
          }
    });
  }

  fire () {
    console.log("Boss", "fire");
    var $this = this;
    if (! this.isMoving) {
      this.can_hurt = true;
      this.isAttacking = true;
      this.object.play("boss_fire");
      this.scene.sound.play('fx_boss_fire');
      var posX_hero = this.scene.objects.hero.object.body.x;
      var posY_hero = this.scene.objects.hero.object.body.y;
      var posX_boss = this.object.body.x;
      var posY_boss = this.object.body.y;
      var velocityX = 1 * (posX_hero - posX_boss);
      var velocityY = 1 * (posY_hero - posY_boss);
      if (this.object.flipX) {
        this.fire_logo.x = posX_boss + 50;
      } else {
        this.fire_logo.x = posX_boss + 100;
      }
      this.fire_logo.y = posY_boss+70;

      this.fire_logo.setVelocity(velocityX, velocityY);
      this.fire_logo.play("fire_logo");
      setTimeout(function(){
        $this.isAttacking = false;
      },1000)
    }
  }

  update() {
    if (gameStatus.energy <= 0) this.hero_dead = true;
    if (! this.isAttacking && ! this.hero_dead) {
      this.object.flipX = (this.object.body.x >= this.scene.objects.hero.object.body.x);
      var posX = this.object.body.x - this.scene.objects.hero.object.body.x;
      var posY = this.object.body.y - this.scene.objects.hero.object.body.y;
      var dist = posX*posX + posY*posY;
      if (dist >=0 && dist < 800*800/8) this.object.setFrame(2);
      else if (dist < 800*800/4) this.object.setFrame(1);
      else this.object.setFrame(0);
    }
    if (this.hero_dead) {
      window.clearInterval(this.move_interval)
      window.clearInterval(this.fire_interval)
      if (! this.object.anims.isPlaying) {
        this.object.play("boss_hero_dead");
        console.log("PLAY HERO DEAD")
      }

    }
  }
}

class BossFactory extends BaseObject{
  constructor(scene){
    super(scene, BossFactory)
  }

  preload() {
    console.log("BossFactory", "preload");
    this.scene.load.spritesheet("boss", 'assets/img/characters/boss/boss.png', {
      frameWidth: 148,
      frameHeight: 100,
      margin: 0,
      spacing: 0
    });
    this.scene.load.spritesheet("fire_logo", 'assets/img/characters/boss/logo.png', {
      frameWidth: 50,
      frameHeight: 50,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    console.log("BossFactory", "create");

    this.scene.anims.create({
      key: 'boss',
      frames: this.scene.anims.generateFrameNumbers('boss', {
        start: 0,
        end: 9
      }),
      scale: 1,
      frameRate: 9,
      repeat: 0
    });
    this.scene.anims.create({
      key: 'boss_fire',
      frames: this.scene.anims.generateFrameNumbers('boss', {
        frames: [3, 4, 3, 2]
      }),
      scale: 1,
      frameRate: 9,
      repeat: 0
    });
    this.scene.anims.create({
      key: 'boss_hero_dead',
      frames: this.scene.anims.generateFrameNumbers('boss', {
        frames: [5, 5, 5, 5, 6]
      }),
      scale: 1,
      frameRate: 2,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'fire_logo',
      frames: this.scene.anims.generateFrameNumbers('fire_logo', {
        start: 0,
        end: 3
      }),
      scale: 1,
      frameRate: 10,
      repeat: -1
    });
  }
}
