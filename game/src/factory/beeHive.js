class Bee extends BaseObject{
  constructor(scene, hive, initial_position) {
    super(scene);
    this.hive = hive;
    this.object = this.scene.physics.add.sprite(initial_position[0], initial_position[1], 'bee')
                  .setScale(0.3).play("fly")
  }

  update(){
    this.object.x=this.object.x+Math.random()*4-2;
    this.object.y=this.object.y+Math.random()*4-2;
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
        end: 1
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
    var x = area[2]*Math.random()+area[0];
    var y = area[3]*Math.random()+area[1];
    this.create_one(x, y);
  }
  create_one_areas(){
    this.create_one_area(this.areas()[0]);
  }

  areas(){
    return this.scene.scenario.data.areas;
  }

  check_outside_area(x, y){

  }

  update(){
    var $this = this;
    this.bees.forEach(function(bee){
      bee.x=bee.x+Math.random()*4-2;
      bee.y=bee.y+Math.random()*4-2;
    })
  }
}
