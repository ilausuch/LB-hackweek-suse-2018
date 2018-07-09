class game extends Phaser.Scene {

  constructor() {
    super('game')

    window.scene = this;

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

    this.scenario = new Scenario(this,
                                 "scenario_1",
                                 "assets/img/scenarios/scenario_1.png",
                                 "assets/img/scenarios/scenario_1_outer_layer.png",
                                 "assets/img/scenarios/scenario_1.json");
    this.hero = new Hero(this);

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

    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
    this.preparePhysics();

    for (var i in this.objects) {
      this.objects[i].postCreation();
    }

    scene.cameras.cameras[0].fadeIn(500);
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
  }

  end_game(){
  }
}
