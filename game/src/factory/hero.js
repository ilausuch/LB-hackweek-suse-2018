class Hero extends BaseObject {

  constructor(scene, initial_posX=100, initial_posY=400) {
    super(scene, 'hero');
    this.animation = undefined;
    this.is_injured = false;
    this.injured_tint_status = false;
    this.dead = false;
    this.initial_posX = initial_posX;
    this.initial_posY = initial_posY;

    this.create();
  }

  create() {
    console.log("hero","create");

    this.prepareObjects();
    this.postCreation();

    var $this = this;

    this.injured_interval = setInterval(function(){
      if ($this.is_injured){
        if ($this.injured_interval_counter == 0){
          $this.set_tint(undefined);
          $this.is_injured = false;
          $this.injured_tint_status = false;
        }
        else{
          $this.injured_tint_status = !$this.injured_tint_status;
          if ($this.injured_tint_status)
            $this.set_tint(0xFF0000);
          else
            $this.set_tint(undefined);

          $this.injured_interval_counter--;
        }
      }
    },500);
  };

  prepareObjects() {
    this.object = this.scene.physics.add.sprite(this.initial_posX, this.initial_posY, 'hero').setScale(0.9);
    this.object.setVelocity(0, 200);
    this.object.setBounce(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    //this.object.y = this.scene.scenario.data.floor - this.object.height;
    this.object.play("hero");
    this.object.anims.stop(0, false);
    this.object.setMass(10000);

    this.tongue_attack = this.scene.physics.add.sprite(0, 0, 'hero_attack').setScale(0.9);
    this.tongue_attack.play("hero_attack");

  }

  keydown_SPACE(){
    var pos = this.getHeadPosition();
    if (! this.tongue_attack.anims.isPlaying) {
      this.tongue_attack.setVisible(true);
      this.tongue_attack.play("hero_attack");
      this.scene.sound.play('fx_attack');
      this.tongue_attack_timestamp = Math.floor((new Date).getTime()/1000);
    }
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.object);
  }


  update() {
    if (!this.dead && !this.destroyed){
      if (this.invulnerable_timeout > gameStatus.timestamp())
        this.object.setAlpha(0.5);
      else
        this.object.setAlpha(1);

      var $this = this;
      var last_velocityX = this.object.body.velocity.x;

      this.object.setVelocityX(0);

      if (this.scene.cursors.up.isDown && this.object.body.velocity.y == 0)
      {
          this.object.setVelocityY(-500);
          this.scene.sound.play('fx_jump');
      }

      if (last_velocityX == 0) this.object.anims.play();

      if (this.scene.cursors.left.isDown)
      {
          this.object.setVelocityX(-300);
          this.object.flipX = true;
      }
      else if (this.scene.cursors.right.isDown)
      {
          this.object.setVelocityX(300);
          this.object.flipX = false;
      }

      if (this.object.body.velocity.x == 0) this.object.anims.stop();

      var pos = this.getHeadPosition();
      this.tongue_attack.x = pos[0];
      this.tongue_attack.y = pos[1];

      if (this.object.flipX) this.tongue_attack.flipX = true;
      else this.tongue_attack.flipX = false;
    }
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

  check_tongue_touch(object){
    var distance_x = 0;

    if (!this.tongue_attack.flipX)
      distance_x = Math.abs(this.tongue_attack.body.x - object.body.x);
    else
      distance_x = Math.abs((this.tongue_attack.body.x + this.tongue_attack.body.width)
                            - (object.body.x + object.body.width));

    var distance_y = Math.abs(object.body.y + object.body.height - this.tongue_attack.body.y + 20);
    var min_distance_x = 38;

    switch (this.tongue_attack.frame.name){
      case 2: min_distance_x = 43; break;
      case 3: min_distance_x = 94; break;
      case 4: min_distance_x = 94; break;
      case 5: min_distance_x = 80; break;
      default: return false;
    }

    //console.log("*",distance_y, this.tongue_attack.body.y, object.body.y);
    //console.log("*",this.tongue_attack.frame.name, distance_x, min_distance_x);

    return (distance_x < min_distance_x) && (distance_y > 30);
  }

  setup_attack_to_enemy(enemy, handler){
    var $this = this;
    this.scene.physics.add.overlap(enemy.get_screen_object(), this.tongue_attack, function(a, b){
      if ($this.check_tongue_touch(b)) {
        handler($this);
      }
    });
  }

  injured(){
    this.injured_interval_counter = 2
    this.is_injured = true;
  }

  die(){
    if (!this.dead){
      var $this = this;
      this.dead = true;
      this.object.flipY = true;

      this.scene.tweens.add({
          targets: this.object,
          y: 700,
          ease: 'Back.easeIn',
          duration: 1000,
          onComplete: function(){
            //$this.destroy();
          }
      });

      var x_move = this.object.body.x<400 ? 200 : -200;

      this.scene.tweens.add({
          targets: this.object,
          x: this.object.body.x + x_move,
          ease: 'linear',
          duration: 500,
      });

      scene.cameras.cameras[0].shake(400, 0.05, false);
      this.scene.sound.play('fx_hero_dead');
      this.scene.music_loop.pause();
    }
  }

  set_tint(value){
    this.object.setTint(value);
    this.tongue_attack.setTint(value);
  }

  destroy(){
    this.destroyed = true;
    this.object.destroy();
    this.tongue_attack.destroy();
    this.object = undefined;
    this.tongue_attack = undefined;
    clearInterval(this.injured_interval);
  }

  restore(){
    try{
      console.log("Hero restore");
      this.set_invulnerable(3);
      this.object.x = this.initial_posX;
      this.object.y = this.initial_posY;
      this.object.flipX  = false;
      this.object.flipY = false;
      this.dead = false;
      this.is_injured = false;
      this.injured_tint_status = false;
      this.scene.restore_hero();
      gameStatus.restore_hero();
    }catch(exception){}
  }

  set_invulnerable(time){
    this.invulnerable_timeout = time + gameStatus.timestamp();
  }
}

class HeroFactory extends BaseObject {

  constructor(scene) {
    super(scene, 'heroFactory');
  }

  preload() {
    this.scene.load.spritesheet("hero_attack", 'assets/img/characters/hero/attack.png', {
      frameWidth: 94,
      frameHeight: 35,
      margin: 0,
      spacing: 0
    });
    //sprites attack: 94x35

    //sprites walk: 97x41
    this.scene.load.spritesheet("hero", 'assets/img/characters/hero/walk.png', {
      frameWidth: 97,
      frameHeight: 41,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    this.scene.anims.create({
      key: 'hero_attack',
      frames: this.scene.anims.generateFrameNumbers('hero_attack', { frames:[0, 1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9]}),
      scale: 1,
      frameRate: 15,
      repeat: 0
    });
    this.scene.anims.create({
      key: 'hero',
      frames: this.scene.anims.generateFrameNumbers('hero', {
        start: 0,
        end: 3
      }),
      scale: 1,
      frameRate: 15,
      repeat: -1
    });
    this.scene.anims.get("hero_attack").hideOnComplete = true;
  }
}
