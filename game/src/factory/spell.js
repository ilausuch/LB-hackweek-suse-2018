class Spell extends BaseObject {

  constructor(scene, type, posX, posY) {
    super(scene, type);
    this.animation = undefined;
    this.type = type; // type = 'cloud' | 'sles' | 'storage' | 'manager'
    this.posX = posX;
    this.posY = posY;
    this.post_anim_name = 'post' + this.type;
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
    this.scene.load.spritesheet(this.post_anim_name, 'assets/img/objects/spell_taken.png', {
      frameWidth: 50,
      frameHeight: 50,
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
    this.scene.anims.create({
      key: this.post_anim_name,
      frames: this.scene.anims.generateFrameNumbers(this.post_anim_name, {
        start: 0,
        end: 7
      }),
      scale: 1,
      frameRate: 15,
      repeat: 0
    });
    this.scene.anims.get(this.post_anim_name).hideOnComplete = true;
  }

  prepareObjects() {
    this.object = this.scene.physics.add.sprite(0, 0, this.type).setScale(0.5);
    this.object.x = this.posX;
    this.object.y = this.posY;
    this.object.play(this.type);
    this.scene.physics.add.overlap(this.object, this.scene.objects.hero.object, this.onSpellTaken, null, this);


    this.post_sprites = this.scene.physics.add.sprite(0, 0, this.post_anim_name);
    //this.this.post_anim_name_sprites.play("this.post_anim_name");
    //this.this.post_anim_name_sprites.anims.stop(0, false);
  }

  onSpellTaken(a,b){
    gameStatus.spellProvider(this.type);
    this.object.destroy();
    this.post_sprites.x = this.posX;
    this.post_sprites.y = this.posY-20;
    this.post_sprites.setVisible(true);
    this.post_sprites.play(this.post_anim_name);
    if (this.type == "sles") this.scene.sound.play('spell_sles');
    else this.scene.sound.play('spell_default');

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
