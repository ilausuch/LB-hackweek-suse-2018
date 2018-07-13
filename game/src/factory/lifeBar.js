class LifeBar extends BaseObject{
  constructor(scene) {
    super(scene, "lifeBar");

    this.position = {x: 10, y: 10};
    this.size={w:100, h:20};
    this.rect_full = new Phaser.Geom.Rectangle(this.position.x, this.position.y,
                                               this.size.w+2, this.size.h+2);
    this.rect_energy = new Phaser.Geom.Rectangle(this.position.x+1, this.position.y+1,
                                                 this.size.w*gameStatus.energy, this.size.h);
  }

  preload() {

  }

  create() {
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
  }

}
