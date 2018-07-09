class game extends Phaser.Scene {

  constructor() {
    super('game')

    window.scene = this;

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
                                 "assets/img/scenarios/scenario_1.json");
  }

  preload() {
    this.scenario.preload();
  }

  create() {
    this.scenario.create();
    
    this.createAnimations();
    this.prepareObjects();
    this.prepareSounds();
    this.prepareControls();
    this.preparePhysics();

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

  }

  update() {

  }

  start_game(){
  }

  end_game(){
  }
}
