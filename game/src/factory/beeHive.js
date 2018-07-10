class Bee extends BaseObject{
  constructor(scene, hive, initial_position) {
    super(scene, "bee", true);
    this.hive = hive;
    this.status = "alive";

    this.max_speed=30;
    this.chaise_speed=80;

    this.object = this.scene.physics.add.sprite(initial_position[0], initial_position[1], 'bee')
                  .setScale(0.5).play("fly")
    this.object.setCollideWorldBounds(true);
    this.object.setMaxVelocity(this.max_speed, this.max_speed);
    this.object.setBounce(1, 1);

    this.acceleration =10;
    this.chase_speed=1.4;

    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.object, this.bite, null, this);
    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.attack_sprites, this.tongue, null, this);
  }

  bite(a,b){
    gameStatus.decreaseEnergy(0.001);
  }

  tongue(a,b){
    if (b.visible){
      console.log("tongue!");
      this.status = "death";
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
      var distance_to_hero = this.scene.objects.hero.distance_to_object(this);

      if (distance_to_hero < 20000){
        this.object.setTint(0xFFA000);
        this.chase_movement();
      }else {
        this.object.setTint(undefined);
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

class BeeHive extends BaseObject {

  constructor(scene) {
    super(scene, "beeHive");

    this.bees = [];
  }

  preload(){
    this.scene.load.spritesheet("bee", 'assets/img/characters/bee/sprites.png', {
      frameWidth: 96,
      frameHeight: 96,
      margin: 0,
      spacing: 0
    });
  }

  create(){
    this.scene.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNumbers('bee', {
        start: 0,
        end: 10
      }),
      scale: 1,
      frameRate: 10,
      repeat: -1
    });
  }

  create_one(x,y){
    this.bees.push(new Bee(this.scene, this, [x, y]));
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
