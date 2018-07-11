class Bug1 extends BugBase{
  constructor(scene, hive, initial_position) {
    super(scene, hive, initial_position);
    this.max_speed=100;
    this.chaise_speed=120;
    this.attack_distance = 40000;
    this.acceleration =20;
    this.puntuation = 10;
    this.decrease_energy_on_bite = 0.01;
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
