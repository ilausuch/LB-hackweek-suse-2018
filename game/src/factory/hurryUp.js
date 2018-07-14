class HurryUp extends BaseObject{
  constructor(scene, font){
    super(scene, "HurryUp");
    this.font = font;
  }

  create(){
    this.characters = this.font.addString("HurryUp", 280, 300, 0.5);
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
        scaleX: 0.8,
        scaleY: 0.8,
        ease: 'Bounce.easeInOut',
        duration: 800,
        delay: d*10,
        onComplete:function(){
          $this.characters.forEach(function(character){
            $this.scene.tweens.add({
              targets: character.object,
              alpha: 0.5,
              ease: 'linear',
              duration: 3000
            });
          })
        }
      });

      d++;
    })
  }


}
