class Scenario{
  constructor(scene, name, image_url, data_url){
    this.name = name;
    this.scene = scene;
    this.image_url = image_url;
    this.data_url = data_url;
  }

  preload(){
    this.scene.load.image(this.name, this.image_url);
    this.scene.load.json(this.name+'_data', this.data_url);
  }

  create(){
    this.data = this.scene.cache.json.get(this.name+'_data');

    this.img = this.scene.add.sprite(800/2, 600/2, this.name).setScale(1);


    var $this = this;
    this.data.floors.forEach(function(floor){
      $this.create_wall(floor);
    });

  }

  create_wall(floor){
    var rect = new Phaser.Geom.Rectangle(0, 0, floor.length, 2);
    var o = this.scene.add.graphics({ fillStyle: { color: 0x0000ff, alpha:0 } });
    o.fillRectShape(rect);
    this.scene.physics.add.existing(o);
    o.body.setGravityY(0);
    o.x=floor.position[0];
    o.y=floor.position[1];
    o.body.width=floor.length;
    o.body.height=2;
    o.body.setImmovable();
    o.body.checkCollision.up = true;
    o.body.checkCollision.down = false;
    floor.object = o;
  }

  define_collisions(other_object){
    var $this = this;
    this.data.floors.forEach(function(floor){
      $this.scene.physics.add.collider(other_object, floor.object);
    });
  }

}
