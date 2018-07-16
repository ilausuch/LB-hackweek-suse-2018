class Bug1 extends BugBase{
  constructor(scene, hive, initial_position) {
    super(scene, hive, initial_position);
    this.pain = 0.1;
    this.puntuation = 5;
    this.max_speed = 120;
    this.chaise_speed = 120;
    this.attack_distance = 40000;
    this.acceleration = 20;
    this.configure("bug1");
  }
}

class Bug1Hive extends BugHiveBase{
  constructor(scene) {

    var config={
      name:"bug1",
      sprite:{
        url:"assets/img/characters/bug1/sprites.png",
        width:63,
        height:63
      },
      basic_animation:{
        config: {start:0, end:5},
        speed: 8
      }
    }
    super(scene, config)
  }

  new_bug(x, y, config){
    return new Bug1(this.scene, this, [x, y]);
  }
}
