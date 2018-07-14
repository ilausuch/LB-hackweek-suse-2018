class GameOver extends BaseObject{
  constructor(scene, font){
    super(scene, "GameOver");

    this.font = font;
  }

  create(){
    this.characters = this.font.addString("GAME OVER", 260, 0, 0.5);
  }


  delayedCreation(){
    this.hide();
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
        y:300,
        ease: 'Bounce.easeOut',
        duration: 800,
        delay: d*10,
        onComplete:function(){

        }
      });

      d++;
    })
  }


}
