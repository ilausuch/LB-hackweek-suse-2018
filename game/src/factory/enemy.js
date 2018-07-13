class Enemy extends BaseObject{
  constructor(scene, name, multiple){
    super(scene, name, multiple);
    this.energy = 1;
    this.puntuation = 1;
  }

  preload(){
    this.scene.load.spritesheet("explosion", 'assets/img/addons/smoke.png', {
      frameWidth: 128,
      frameHeight: 128,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    console.log(this.id + ":create");
    this.prepareSounds();
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
  };

  prepareSounds(){

  }

  createAnimations(){
    this.scene.anims.create({
      key: 'explosion_play',
      frames: this.scene.anims.generateFrameNumbers('explosion', {
        begin:0,
        end:10
      }),
      scale: 1,
      frameRate: 20,
      repeat: 0
    });
    this.scene.anims.get('explosion_play').hideOnComplete = true;
  }

  prepareObjects(){

  }

  prepareSounds(){

  }

  postCreation() {
    var $this = this;
    this.scene.scenario.define_collisions(this.object,
                                          function(a, b){
                                            $this.onCollideFloor();
                                          },
                                          function(a, b){
                                            $this.onCollideWalls();
                                          });

    this.scene.physics.add.collider(this.object, this.scene.objects.hero.object, function(a, b){
      $this.attackToHero(b.owner);
    });
    this.scene.objects.hero.setup_attack_to_enemy(this, function(hero){
      $this.attackedByHero(hero);
    });
  }

  onCollideFloor(){

  }

  onCollideWalls(){

  }

  attackToHero(to){

  }

  attackedByHero(from){
    console.debug("attacked!");
    this.energy = this.energy -1;
    if (this.energy <= 0){
      this.explosion = this.scene.add.sprite(0, 0, 'explosion').setScale(0.8).play("explosion_play");
      this.explosion.x = this.object.body.x + this.object.body.width/2;
      this.explosion.y = this.object.body.y + this.object.body.height/2;

      var plusPuntuation = new PlusPuntuation(this.scene, this.puntuation, this.object.body.x, this.object.body.y);

      this.die();

    }
  }
}
