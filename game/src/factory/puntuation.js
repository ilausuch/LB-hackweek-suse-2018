class Puntuation extends BaseObject{
  constructor(scene, font){
    super(scene, "puntuation");
    this.font = font;
  }

  create(){
    this.characters = this.font.addString("000", 350, 20, 0.5);
  }

  update_puntuation(){
    this.characters[0].setCharacter("" + Math.floor(gameStatus.puntuation/100));
    this.characters[1].setCharacter("" + Math.floor((gameStatus.puntuation%100)/10));
    this.characters[2].setCharacter("" + Math.floor(gameStatus.puntuation%10));
  }
}
