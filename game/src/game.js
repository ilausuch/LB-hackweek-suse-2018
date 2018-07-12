class game extends Phaser.Scene {

  constructor() {
    super('game')

    window.scene = this;
    gameStatus.registry_scene(this);

    this.objects = {};

    this.$o = {};
    this.$sounds = {};
    this.$groups = {};
    this.$conf = {
    };

    this.$game = {
      coins: 0,
      health: 0,
      state: 0,
    };

    this.level = new Level(this, {
      totalTime : 2*60
    })

    this.font = new Font(this);

    this.scenario = new Scenario(this,
                                 "scenario_1",
                                 "assets/img/scenarios/scenario_1.png",
                                 "assets/img/scenarios/scenario_1_outer_layer.png",
                                 "assets/img/scenarios/scenario_1.json");
    this.hero = new Hero(this);
    this.beeHive = new BeeHive(this);
    this.bug1Hive = new Bug1Hive(this);
    this.bug2Hive = new Bug2Hive(this);
    this.pacman = new Pacman(this, 500, 530, 200);

    this.puntuation = new Puntuation(this, this.font);
    this.timer = new Timer(this, this.font);
    this.lifeBar = new LifeBar(this);
  }

  registry_object(object){
    this.objects[object.id] = object;
  }

  preload() {
    for (var i in this.objects) {
      this.objects[i].preload();
    }
  }

  create() {
    for (var i in this.objects) {
      this.objects[i].create();
    }

    for (var i=0; i<2; i++)
      this.beeHive.create_one_areas();

    for (var i=0; i<5; i++)
      this.bug2Hive.create_one_areas();

    for (var i=0; i<5; i++)
      this.bug1Hive.create_one_areas();

    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
    this.preparePhysics();

    for (var i in this.objects) {
      this.objects[i].postCreation();
    }

    var $this = this;

    setTimeout(function(){
      for (var i in $this.objects) {
        $this.objects[i].delayedCreation();
      }
    })

    scene.cameras.cameras[0].fadeIn(500);

    this.start_game();
  };

  createAnimations() {

  }

  prepareObjects() {
  }

  prepareSounds(){

  }

  prepareControls(){
  }

  preparePhysics(){
    this.hero.postCreation();
  }

  update() {
    for (var i in this.objects) {
      this.objects[i].update();
    }
  }

  start_game(){
    this.level.start();
  }

  end_game(){
  }
}
