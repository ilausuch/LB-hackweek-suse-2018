class Bee extends BugBase{
  constructor(scene, hive, initial_position) {
    super(scene, hive, initial_position);
    this.puntuation = 5 ;
  }
}

class BeeHive extends BugHiveBase{
  constructor(scene) {

    var config={
      name:"bee",
      sprite:{
        url: "assets/img/characters/bee/sprites.png",
        width: 96,
        height: 96
      },
      basic_animation:{
        config: {start: 0, end: 10},
        speed: 10
      }
    }
    super(scene, config)
  }

  new_bug(x, y, config){
    return new Bee(this.scene, this, [x, y]);
  }
}
