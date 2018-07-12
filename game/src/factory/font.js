class Character extends BaseObject{
  constructor(scene, font, x, y, character, scale){
    super(scene, "character", true);
    this.font = font;
    this.x = x;
    this.y = y;
    this.character = character;
    this.scale = scale;
  }

  get_image_from_character(){
    var code = this.character.charCodeAt(0);

    if (code>=48 && code<=57)
      return code - 48 + 52;

    if (this.character==':')
      return 65;
  }

  postCreation(){
    this.object = this.scene.add.image(this.x, this.y, 'font', this.get_image_from_character())
                  .setScale(this.scale);
  }

  setCharacter(character){
    this.character = character;
    this.object.setFrame(this.get_image_from_character(character));
  }


}

class Font extends BaseObject{
  constructor(scene){
    super(scene, "Font");
  }

  preload(){
    this.scene.load.spritesheet("font", "assets/img/addons/font.png", {
      frameWidth: 78,
      frameHeight: 75,
      margin: 0,
      spacing: 0
    });
  }

  addString(str, x, y, scale){;
    if (scale == undefined)
      scale = 1;

    var list = [];
    for (var i=0; i<str.length; i++){
      list.push(new Character(this.scene, this, x+i*scale*74, y, str[i], scale));
    }

    return list;
  }
}
