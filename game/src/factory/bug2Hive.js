class Bug2 extends BugBase{
  constructor(scene, hive, initial_position) {
    super(scene, hive, initial_position);
    this.puntuation= 1;
    this.can_attack= false;
    this.pain= 0.01;
    this.configure("bug2");
  }
}

class Bug2Hive extends BugHiveBase{
  constructor(scene) {

    var config={
      name:"bug2",
      sprite:{
        url:"assets/img/characters/bug2/sprites.png",
        width:63,
        height:63
      },
      basic_animation:{
        config: {frames: [ 0, 1, 2, 3, 2, 3, 2, 1 ]},
        speed: 15
      }
    }
    super(scene, config)
  }

  new_bug(x, y, config){
    return new Bug2(this.scene, this, [x, y]);
  }
}
