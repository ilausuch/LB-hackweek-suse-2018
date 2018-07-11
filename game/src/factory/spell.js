class Spell extends BaseObject {

  constructor(scene, type, posX, posY) {
    super(scene, type);
    this.animation = undefined;
    this.type = type; // type = 'cloud' | 'sles' | 'storage' | 'manager'
    this.posX = posX;
    this.posY = posY;
  }

  preload() {
    console.log(this.type);
    var path = undefined;
    if (this.type == "cloud") {
      path = 'assets/img/objects/spell_cloud.png';
    } else if (this.type == "sles") {
      path = 'assets/img/objects/spell_sles.png';
    } else if (this.type == "manager") {
      path = 'assets/img/objects/spell_manager.png';
    } else if (this.type == "storage") {
      path = 'assets/img/objects/spell_storage.png';
    }
    this.scene.load.spritesheet(this.type, path, {
      frameWidth: 100,
      frameHeight: 100,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    console.log("spell:create");
    this.prepareSounds();
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
  };

  createAnimations() {
    this.scene.anims.create({
      key: this.type,
      frames: this.scene.anims.generateFrameNumbers(this.type, {
        start: 0,
        end: 9
      }),
      scale: 1,
      frameRate: 20,
      repeat: -1
    });
  }

  prepareObjects() {
    this.object = this.scene.physics.add.sprite(0, 0, this.type).setScale(0.5);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.play(this.type);
  }

  prepareSounds(){

  }

  prepareControls(){
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.object);
    var $this = this;
    setTimeout(function(){
      //$this.object.body.width = 50;
    })
  }


  update() {
  }


}
