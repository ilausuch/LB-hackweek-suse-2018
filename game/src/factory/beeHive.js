class Bee extends BaseObject{
  constructor(scene, hive, initial_position) {
    super(scene, "bee", true);
    this.hive = hive;
    this.object = this.scene.physics.add.sprite(initial_position[0], initial_position[1], 'bee')
                  .setScale(0.3).play("fly")

    this.speed = 2;
    this.chase_speed=1.4;
  }

  stay_movement(){
    var next_x, next_y;
    var movement = Math.random()*10-10;

    do {
      next_x = this.object.x + (Math.random() - 0.5) * this.speed;
      next_y = this.object.y + (Math.random() - 0.5) * this.speed;
    } while (!this.scene.scenario.check_object_inside_area(this, next_x, next_y));

    this.object.x= next_x;
    this.object.y= next_y;
  }

  chase_movement(){
    var position_hero = this.scene.objects.hero.position();
    var center_hero = this.scene.objects.hero.position(true);
    var center = this.position(true);


    console.log(center_hero.y - center.y);

    var direction_x = center.x > center_hero.x ? -1 : 1;
    var direction_y = center.y > center_hero.y ? -1 : 1;


    var next_x = this.object.x + direction_x*this.chase_speed + (Math.random() - 0.5) * this.speed;
    var next_y = this.object.y + direction_y*this.chase_speed + (Math.random() - 0.5) * this.speed;

    if (!this.scene.scenario.check_object_inside_area(this, next_x, next_y))
      this.stay_movement();
    else{
      this.object.x= next_x;
      this.object.y= next_y;
    }
  }

  update(){
    var distance_to_hero = this.scene.objects.hero.distance_to_object(this);

    if (distance_to_hero < 20000){
      this.object.setTint(0xFFA000);
      this.chase_movement();
      if (distance_to_hero < 100)
        this.object.setTint(0xFF0000);
    }else {
      this.object.setTint(undefined);
      this.stay_movement();
    }


  }

  get_screen_object(){
    return this.object;
  }
}

class BeeHive extends BaseObject {

  constructor(scene) {
    super(scene, "bee");

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
      frameRate: 6,
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
