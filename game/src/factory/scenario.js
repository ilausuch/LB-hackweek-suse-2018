class Scenario extends BaseObject{
  constructor(scene, name, image_url, outer_url, data_url){
    super(scene, name);

    this.name = name;
    this.image_url = image_url;
    this.outer_url = outer_url;
    this.data_url = data_url;
  }

  preload(){
    console.log("scenario",this.name,"preload");
    this.scene.load.image(this.name, this.image_url);
    this.scene.load.image(this.name+"_outer", this.outer_url);
    this.scene.load.json(this.name+'_data', this.data_url);
  }

  manual_create(){
    console.log("scenario",this.name,"manual_create");
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

    this.data.platforms.forEach(function(platform){
      $this.create_platform(platform);
    });
    this.configure_audio();
  }

  manual_create2(){
    console.log("scenario",this.name,"manual_create2");
    this.outer_img = this.scene.add.sprite(800/2, 600/2, this.name+"_outer").setScale(1);
  }

  configure_audio() {
    var $this = this;
    this.music_loop = this.scene.sound.add('music_loop', { loop: true});
    this.fx_collision_loop = this.scene.sound.add('fx_collision_loop', { loop: true});
    this.fx_bee_bite = this.scene.sound.add('fx_bee_bite', { loop: true});
    this.scene.sound.add('fx_spell_default');
    this.scene.sound.add('fx_spell_sles');
    this.scene.sound.add('fx_attack');
    this.scene.sound.add('fx_jump');
    this.scene.sound.add('fx_bug_bonus');
    this.scene.sound.add('fx_enemy_killed');
    this.scene.sound.add('fx_hero_dead');

    // volumes
    this.music_loop.volume = 0.5;
    this.fx_bee_bite.volume = 2;


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

    this.fx_collision_loop.play();
    this.fx_collision_loop.pause();
    this.fx_bee_bite.play();
    this.fx_bee_bite.pause();
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

  create_platform(platform){
    var rect = new Phaser.Geom.Rectangle(0, 0, platform.weight, platform.height);
    var o = this.scene.add.graphics({ fillStyle: { color: 0x00ff00, alpha:0 } });
    o.fillRectShape(rect);
    this.scene.physics.add.existing(o);;
    o.x=platform.position[0];
    o.y=platform.position[1];
    o.body.width=platform.weight;
    o.body.height=platform.height;
    o.body.setImmovable();
    platform.object = o;
  }

  define_collisions(other_object, handler_floor, handler_wall, type="all"){
    var $this = this;
    if (type == "all") {
      this.data.floors.forEach(function(floor){
        $this.scene.physics.add.collider(other_object, floor.object, handler_floor);
      });

      this.data.walls.forEach(function(wall){
        $this.scene.physics.add.collider(other_object, wall.object, handler_wall);
      });
    } else if (type == "floor") {
      this.data.floors.forEach(function(floor){
        $this.scene.physics.add.collider(other_object, floor.object, handler_floor);
      });
    }
  }

  define_collisions_platforms(other_object, handler){
    var $this = this;
    this.data.platforms.forEach(function(platform){
      $this.scene.physics.add.overlap(other_object, platform.object, handler);
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
