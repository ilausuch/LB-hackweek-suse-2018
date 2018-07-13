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

    if (this.character == '+')
      return 83;

    if (code>=65 && code<=90)
      return code - 65 + 0;

    if (code>=97 && code<=122)
      return code - 97 + 26;

    if (this.character == ' ')
      return 95;
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

  addString(str, x, y, scale, forceCreation){
    if (forceCreation == undefined)
      forceCreation = false;

    if (scale == undefined)
      scale = 1;

    var list = [];
    for (var i=0; i<str.length; i++){
      list.push(new Character(this.scene, this, x+i*scale*74, y, str[i], scale));
    }

    if (forceCreation)
      list.forEach(function(character){
        character.postCreation();
      });

    return list;
  }
}
