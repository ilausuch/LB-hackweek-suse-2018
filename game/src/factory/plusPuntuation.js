class PlusPuntuation extends BaseObject{
  constructor(scene, value, x, y){
    super(scene, "PlusPuntuation", true);
    this.value = value;
    this.x = x;
    this.y = y;
    this.create();
  }

  create(forceCreation){
    if (forceCreation == undefined)
      forceCreation = true;

    var $this = this;

    this.characters = this.scene.font.addString("+"+this.value, this.x, this.y, 0.4, forceCreation);

    var list = [];
    this.characters.forEach(function(character){
      list.push(character.object);
    })

    this.scene.tweens.add({
        targets: list,
        y: this.y-100,
        alpha:0,
        ease: 'linear',
        duration: 500,
        onComplete: function (){
          $this.characters.forEach(function(character){
            character.die();
          })
        }
    });

  }
}
