class Hero extends BaseObject {

  constructor(scene) {
    super(scene, 'hero');
    this.scene = scene;
  }

  preload() {
    this.scene.load.image('hero', '/assets/img/characters/hero/base.png');
  }

  create() {
    console.log("hero:create");
    this.prepareSounds();
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
  };

  createAnimations() {
  }

  prepareObjects() {
    this.heroObj = this.scene.physics.add.sprite(150, app.config.height - 50, 'hero').setScale(0.9);
    this.heroObj.setVelocity(0, 200);
    this.heroObj.setBounce(0, 0);
    this.heroObj.setCollideWorldBounds(true);
    this.heroObj.setGravityY(1000);
  }

  prepareSounds(){

  }

  prepareControls(){
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.keyboard.on('keydown_SPACE', function(event) {
        console.log("JUMP!");
        this.heroObj.setVelocity(0,-500);
      }, this);
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.heroObj);
  }


  update() {
    this.heroObj.setVelocityX(0);
    if (this.cursors.left.isDown)
    {
        this.heroObj.setVelocityX(-300);
        this.heroObj.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.heroObj.setVelocityX(300);
        this.heroObj.flipX = false;
    }
  }

}
