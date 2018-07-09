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
    this.heroObj = this.scene.physics.add.sprite(150, 0 , 'hero').setScale(0.9);
    this.heroObj.setVelocity(0, 200);
    this.heroObj.setBounce(0, 0);
    this.heroObj.setCollideWorldBounds(true);
    this.heroObj.setGravityY(1000);
    this.heroObj.y = this.scene.objects.scenario.data.floor - this.heroObj.height;
  }

  prepareSounds(){

  }

  prepareControls(){
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.keyboard.on('keydown_SPACE', function(event) {
        if (this.heroObj.body.velocity.y == 0)
          this.heroObj.setVelocity(0,-500);
      }, this);
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.heroObj);
    var $this = this;
    setTimeout(function(){
      $this.heroObj.body.width = 50;
    })
  }


  update() {
    this.heroObj.setVelocityX(0);
    if (this.cursors.up.isDown && this.heroObj.body.velocity.y == 0)
    {
        this.heroObj.setVelocityY(-500);
    }
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
    if (this.heroObj.flipX) {
      this.heroObj.body.x = this.heroObj.x + this.heroObj.width*0.5 - 90;
    }
    else {
      this.heroObj.body.x = this.heroObj.x - this.heroObj.width*0.5+35;
    }
  }



}
