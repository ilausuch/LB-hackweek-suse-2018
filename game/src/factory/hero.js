class Hero extends BaseObject {

  constructor(scene) {
    super(scene, 'hero');
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
    this.object = this.scene.physics.add.sprite(150, 0 , 'hero').setScale(0.9);
    this.object.setVelocity(0, 200);
    this.object.setBounce(0, 0);
    this.object.setCollideWorldBounds(true);
    this.object.setGravityY(1000);
    this.object.y = this.scene.objects.scenario.data.floor - this.object.height;
  }

  prepareSounds(){

  }

  prepareControls(){
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.keyboard.on('keydown_SPACE', function(event) {
        if (this.object.body.velocity.y == 0)
          this.object.setVelocity(0,-500);
      }, this);
  }

  postCreation() {
    this.scene.scenario.define_collisions(this.object);
    var $this = this;
    setTimeout(function(){
      //$this.object.body.width = 50;
    })
  }


  update() {
    this.object.setVelocityX(0);
    if (this.cursors.up.isDown && this.object.body.velocity.y == 0)
    {
        this.object.setVelocityY(-500);
    }
    if (this.cursors.left.isDown)
    {
        this.object.setVelocityX(-300);
        this.object.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.object.setVelocityX(300);
        this.object.flipX = false;
    }
    if (this.object.flipX) {
      //this.object.body.x = this.object.x + this.object.width*0.5 - 90;
    }
    else {
      //this.object.body.x = this.object.x - this.object.width*0.5+35;
    }
  }

}
