class game extends Phaser.Scene {

  constructor() {
    super('game')

    window.scene = this;
    gameStatus.current_scene(this);

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
      totalTime : 2*60,
      enemies:{
        bee:{
          amount: 0 ,
          puntuation: 5,
          pain: 0.001
        },
        bug1:{
          amount: 1,
          puntuation: 10,
          max_speed: 120,
          chaise_speed: 120,
          attack_distance: 40000,
          acceleration: 20,
          pain: 0.01,
        },
        bug2:{
          amount:10,
          puntuation: 2,
          can_attack: false
        },
        mario:{
          enable:true,
          puntuation: 100,
          pain: 0.01,
          attack_pain: 0.1,
          speed: 200,
          attack_speed: 350,
          can_attack:true,
          energy: 10,
          attack_frequency: 0.1,
          jump_frequency: 0.03
        },
        pacman:{
          enable:false,
          puntuation: 50,
          speed: 100,
          pain: 0.05,
          energy: 10,
          persistent_attack: true
        }
      }
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

    if (this.level.config.enemies.mario.enable)
      this.mario = new Mario(this, 350, 200);

    if (this.level.config.enemies.pacman.enable)
      this.pacman = new Pacman(this, 500, 530, 200);

    this.puntuation = new Puntuation(this, this.font);
    this.timer = new Timer(this, this.font);
    this.lifeBar = new LifeBar(this);

    this.spell_cloud = new Spell(this, "cloud", 700, 340);
    this.spell_manager = new Spell(this, "sles", 100, 340);
    this.spell_storage = new Spell(this, "storage", 470, 340);
    this.spell_sles = new Spell(this, "manager", 380, 450);
  }

  registry_object(object){
    this.objects[object.id] = object;
  }

  unregistry_object(object){
    delete this.objects[object.id];
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

    for (var i=0; i<this.level.config.enemies.bee.amount; i++)
      this.beeHive.create_one_areas();

    for (var i=0; i<this.level.config.enemies.bug1.amount; i++)
        this.bug1Hive.create_one_areas();

    for (var i=0; i<this.level.config.enemies.bug2.amount; i++)
      this.bug2Hive.create_one_areas();


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
