class Scenario extends BaseObject{
  constructor(scene, name, image_url, outer_url, data_url){
    super(scene, "scenario");

    this.name = name;
    this.image_url = image_url;
    this.outer_url = outer_url;
    this.data_url = data_url;
  }

  preload(){
    this.scene.load.image(this.name, this.image_url);
    this.scene.load.image(this.name+"_outer", this.outer_url);
    this.scene.load.json(this.name+'_data', this.data_url);
  }

  create(){
    this.data = this.scene.cache.json.get(this.name+'_data');

    this.img = this.scene.add.sprite(800/2, 600/2, this.name).setScale(1);

    var $this = this;

    this.data.walls.forEach(function(wall){
      $this.create_wall(wall);
    });

    this.data.floors.forEach(function(floor){
      $this.create_floor(floor);
    });
  }

  postCreation(){
    this.outer_img = this.scene.add.sprite(800/2, 600/2, this.name+"_outer").setScale(1);
  }

  create_wall(wall){
    var rect = new Phaser.Geom.Rectangle(0, 0, wall.weight, wall.height);
    var o = this.scene.add.graphics({ fillStyle: { color: 0x00ff00, alpha:0 } });
    o.fillRectShape(rect);
    this.scene.physics.add.existing(o);;
    o.x=wall.position[0];
    o.y=wall.position[1];
    o.body.width=wall.weight;
    o.body.height=wall.height;
    o.body.setImmovable();
    wall.object = o;
  }

  create_floor(floor){
    var rect = new Phaser.Geom.Rectangle(0, 0, floor.length, 2);
    var o = this.scene.add.graphics({ fillStyle: { color: 0x0000ff, alpha:0 } });
    o.fillRectShape(rect);
    this.scene.physics.add.existing(o);
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
      $this.scene.physics.add.collider(floor.object, other_object);
    });

    this.data.walls.forEach(function(wall){
      $this.scene.physics.add.collider(other_object, wall.object);
    });
  }

}
