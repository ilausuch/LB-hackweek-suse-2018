class LifeBar extends BaseObject{
  constructor(scene) {
    super(scene, "lifeBar");

    this.position = {x: 10, y: 10};
    this.size = {w:100, h:20};
    this.hearts = [];

    var desp = 70;
    this.rect_full = new Phaser.Geom.Rectangle(this.position.x+desp, this.position.y,
                                               this.size.w+2, this.size.h+2);

    this.rect_energy = new Phaser.Geom.Rectangle(this.position.x+1+desp, this.position.y+1,
                                                 this.size.w*gameStatus.energy, this.size.h);
  }

  preload() {
    console.log("*")
    this.scene.load.image("heart", "assets/img/addons/heart.png");
  }

  create() {;
    this.hearts[0] = this.scene.add.sprite(this.position.x, this.position.y + 12, "heart").setScale(0.5);
    this.hearts[1] = this.scene.add.sprite(this.position.x + 25, this.position.y + 12, "heart").setScale(0.5);
    this.hearts[2] = this.scene.add.sprite(this.position.x + 50, this.position.y + 12, "heart").setScale(0.5);

    this.background = this.scene.add.graphics({ lineStyle:{color:0xFF0000}, fillStyle: { color: 0x0, alpha:0.4 } });
    this.background.fillRectShape(this.rect_full);
    this.background.strokeRectShape(this.rect_full);
    this.background.setDepth(1000);

    this.object = this.scene.add.graphics({ lineStyle:{color:0xFF0000}, fillStyle: { color: 0xFF0000, alpha:1 } });
    this.object.fillRectShape(this.rect_energy);
    this.object.setDepth(1000);
  };

  update(){
    this.rect_energy.width = this.size.w*gameStatus.energy;
    this.object.clear();
    this.object.fillRectShape(this.rect_energy);

    if (gameStatus.lives == 0)
      this.hearts[0].setTint(0x0000000);

    if (gameStatus.lives < 1)
      this.hearts[1].setTint(0x0000000);

    if (gameStatus.lives < 2)
      this.hearts[2].setTint(0x0000000);
  }

}
