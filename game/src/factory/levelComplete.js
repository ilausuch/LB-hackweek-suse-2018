class LevelComplete extends BaseObject{
  constructor(scene, font){
    super(scene, "LevelComplete");

    this.font = font;
  }

  create(){
    this.characters = this.font.addString("Level complete", 150, 300, 0.5);
  }

  delayedCreation(){
    this.hide();
  }

  hide(){
    this.characters.forEach(function(character){
      character.postCreation();
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

      $this.scene.tweens.add({
        targets: character.object,
        scaleX: 0.5,
        scaleY: 0.5,
        ease: 'Bounce.easeInOut',
        duration: 800,
        delay: d*10,
        onComplete:function(){
          counter --;
          if (counter == 0){
            if (scene.level.timeCounter > 0){
              var discountFnc = function(){
                gameStatus.increase_puntuation();
                scene.level.timeCounter --;
                scene.objects.timer.update_time();

                if (scene.level.timeCounter <= 0){
                  setTimeout(function(){
                    gameStatus.nextLevel();
                  },1000);
                }
                else{
                  setTimeout(discountFnc, 20);
                }
              };

              setTimeout(discountFnc ,20);
            }
            else {
              setTimeout(function(){
                gameStatus.nextLevel();
              },1000);
            }
          }
        }
      });

      d++;
    })
  }


}
