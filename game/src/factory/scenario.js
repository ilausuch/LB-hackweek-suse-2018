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
    this.scene.load.audio('music_loop', 'assets/audio/music/loop.mp3');
    this.scene.load.audio('spell_default', 'assets/audio/fx/spell_default.mp3');
    this.scene.load.audio('spell_sles', 'assets/audio/fx/spell_sles.mp3');
  }

  create(){
    this.data = this.scene.cache.json.get(this.name+'_data');

    this.data.areas.forEach(function(area){
      area.w = area.x2 - area.x;
      area.h = area.y2 - area.y;
    })

    this.img = this.scene.add.sprite(800/2, 600/2, this.name).setScale(1);

    var $this = this;

    this.data.walls.forEach(function(wall){
      $this.create_wall(wall);
    });

    this.data.floors.forEach(function(floor){
      $this.create_floor(floor);
    });
    this.music_loop = this.scene.sound.add('music_loop', { loop: true, volume: 0.5 });
  }

  postCreation(){
    this.outer_img = this.scene.add.sprite(800/2, 600/2, this.name+"_outer").setScale(1);
    this.configure_audio();
  }

  configure_audio() {
    var $this = this;
    this.scene.sound.add('spell_default');
    this.scene.sound.add('spell_sles');
    this.music_loop.play();
    this.scene.input.keyboard.on('keydown', function (event) {
        var volume = $this.music_loop.volumeNode.gain.value;
        if (event.code =="KeyM") {
          if ($this.music_loop.isPlaying) $this.music_loop.pause();
          else {
            $this.music_loop.resume();
            $this.music_loop.volumeNode.gain.value = volume;
          }
        }
        if (event.code =="Comma") {
          if (volume > 0) $this.music_loop.volumeNode.gain.value = volume - 0.1;
        }
        if (event.code =="Period") {
          if (volume < 1) $this.music_loop.volumeNode.gain.value = volume + 0.1;
        }
    });
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

  define_collisions(other_object, handler_floor, handler_wall){
    var $this = this;
    this.data.floors.forEach(function(floor){
      $this.scene.physics.add.collider(other_object, floor.object, handler_floor);
    });
    this.data.walls.forEach(function(wall){
      $this.scene.physics.add.collider(other_object, wall.object, handler_wall);
    });
  }

  check_object_inside_area(object, x, y){
    return true; //TODO this is not working, check it again

    object = object.get_screen_object();

    if (x==undefined)
      x = object.x;

    if (y == undefined)
      y = object.y;

    for (var i in this.data.areas) {
      var area = this.data.areas[i];

      if (x >= area.x && x + object.width <= area.x2 && y >= area.y && y + object.height <= area.y2)
        return true;
    }

    return true;
  }

}
