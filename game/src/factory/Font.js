class Character extends BaseObject{
  constructor(scene, font, character){
    super(scene);
    this.font = font;
  }

  create(){
    
  }
}

class Font extends BaseObject{
  constructor(scene){
    super(scene);
  }

  preload(){
    this.scene.load.spritesheet("fonts", "assets/img/addons/fonts.png", {
      frameWidth: 74,
      frameHeight: 74,
      margin: 0,
      spacing: 0
    });
  }

  addString(str){
    var list = [];
    for (var i=0; i<str.length; i++){
      list.push(new Character(this.scene, this, str[i]));
    }

    return list;
  }
}
