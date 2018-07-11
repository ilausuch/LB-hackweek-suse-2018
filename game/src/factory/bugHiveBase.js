class BugBase extends BaseObject{
  constructor(scene, hive, initial_position) {
    super(scene, hive.config.name, true);
    this.hive = hive;
    this.status = "alive";

    this.can_attack=true;
    this.puntuation = 1;
    this.max_speed=30;
    this.chaise_speed=80;
    this.attack_distance = 60000;

    this.object = this.scene.physics.add.sprite(initial_position[0], initial_position[1], hive.config.name)
                  .setScale(0.5).play(hive.config.name+"_fly")

    this.object.setCollideWorldBounds(true);
    this.object.setMaxVelocity(this.max_speed, this.max_speed);
    this.object.setBounce(1, 1);

    this.acceleration =10;
    this.chase_speed=1.4;

    this.decrease_energy_on_bite = 0.001

    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.object, this.bite, null, this);
    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.attack_sprites, this.tongue, null, this);
  }

  bite(a,b){
    if (this.can_attack){
      gameStatus.decreaseEnergy(this.decrease_energy_on_bite);
    }
  }

  tongue(a,b){
    if (b.visible){
      this.status = "death";
      gameStatus.increasePuntuation(this.puntuation);
    }
  }

  stay_movement(){
    this.object.setMaxVelocity(this.max_speed, this.max_speed);

    this.object.setVelocityX((Math.random() - 0.5) * this.acceleration + this.object.body.velocity.x);
    this.object.setVelocityY((Math.random() - 0.5) * this.acceleration + this.object.body.velocity.y);
  }

  chase_movement(){
    var position_hero = this.scene.objects.hero.position();
    var bee_position = this.position();

    var direction_x = bee_position.cx > position_hero.cx  ? -1 : 1;
    var direction_y = bee_position.cy > position_hero.cy ? -1 : 1;

    this.object.setMaxVelocity(this.chaise_speed, this.chaise_speed);

    this.object.setVelocityX(direction_x * this.chaise_speed);
    this.object.setVelocityY(direction_y * this.chaise_speed);
  }

  update(){
    if (this.status == "alive"){
      if (this.can_attack){
        var distance_to_hero = this.scene.objects.hero.distance_to_object(this);

        if (distance_to_hero < this.attack_distance){
          this.object.setTint(0xFFA000);
          this.chase_movement();
        }else {
          this.object.setTint(undefined);
          this.stay_movement();
        }
      }else {
        this.stay_movement();
      }

      if (this.object.body.velocity.x < 0)
        this.object.flipX = true;
      else
        this.object.flipX = false;
    }
    if (this.status == "death"){
      this.object.x = 0;
      this.object.y = 0;
      this.object.setVisible(false);
    }
  }
}

class BugHiveBase extends BaseObject {

  constructor(scene, config) {
    super(scene, config.name);
    this.config = config;
    this.elements = [];
  }

  preload(){
    this.scene.load.spritesheet(this.config.name, this.config.sprite.url, {
      frameWidth: this.config.sprite.width,
      frameHeight: this.config.sprite.height,
      margin: 0,
      spacing: 0
    });
  }

  create(){
    this.scene.anims.create({
      key: this.config.name+'_fly',
      frames: this.scene.anims.generateFrameNumbers(this.config.name,
                                                    this.config.basic_animation.config),
      scale: 1,
      frameRate: this.config.basic_animation.speed,
      repeat: -1
    });
  }

  new_bug(x, y, config){
  }

  create_one(x,y, config){
    this.elements.push(this.new_bug(x, y, config));
  }

  create_one_area(area){
    var x = area.w*Math.random()+area.x;
    var y = area.h*Math.random()+area.y;
    this.create_one(x, y);
  }
  create_one_areas(){
    this.create_one_area(this.areas()[0]);
  }

  areas(){
    return this.scene.scenario.data.areas;
  }
}
