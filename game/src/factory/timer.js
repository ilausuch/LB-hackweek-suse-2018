class Timer extends BaseObject{
  constructor(scene, font){
    super(scene, "timer");
    this.font = font;
  }

  create(){
    this.characters = this.font.addString("00:00", 300, 20, 0.5);
  }

  update_time(){
    var minutes = this.scene.level.timeCounter/60;
    var seconds = this.scene.level.timeCounter%60;

    this.characters[0].setCharacter("" + Math.floor(minutes/10));
    this.characters[1].setCharacter("" + Math.floor(minutes%10));
    this.characters[3].setCharacter("" + Math.floor(seconds/10));
    this.characters[4].setCharacter("" + Math.floor(seconds%10));
  }
}
