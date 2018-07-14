class LevelNumber extends BaseObject{
  constructor(scene, font){
    super(scene, "LevelNumber");

    this.font = font;
  }

  create(){
    console.log("characters created");
    this.characters = this.font.addString("Level 00", 260, 300, 0.5);
  }

  set_level(level){
    this.characters[6].setCharacter(""+Math.floor(level/10));
    this.characters[7].setCharacter(""+level%10);
    this.show();
  }

  delayedCreation(){
    //this.hide();
  }

  hide(){
    this.characters.forEach(function(character){
      character.object.setVisible(false);
    })
  }

  show(){
    var d = 0;
    var $this = this;
    var counter = $this.characters.length;

    this.characters.forEach(function(character){
      character.postCreation();
      character.object.setVisible(true);

      character.object.setScale(0.1);
      character.object.setAlpha(1);

      $this.scene.tweens.add({
        targets: character.object,
        scaleX: 0.5,
        scaleY: 0.5,
        ease: 'Bounce.easeOut',
        duration: 800,
        delay: d*10,
        onComplete:function(){
          $this.characters.forEach(function(character){
            $this.scene.tweens.add({
              targets: character.object,
              alpha: 0,
              ease: 'linear',
              duration: 3000,
              onComplete:function(){
                $this.hide();
              }
            });
          })
        }
      });

      d++;
    })
  }


}
