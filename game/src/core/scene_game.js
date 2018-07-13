class game extends Phaser.Scene {

  constructor() {
    super('game')

    window.scene = this;

    this.objects = {};
    this.scenarios = [];

    this.font = new Font(this);

    for (var i=0; i<2; i++)
      this.scenarios.push(new Scenario(this, "scenario_"+i,
                                             "assets/img/scenarios/scenario_"+i+".png",
                                             "assets/img/scenarios/scenario_"+i+"_outer_layer.png",
                                             "assets/img/scenarios/scenario_"+i+".json"));

    this.hero = new Hero(this);
    this.beeHive = new BeeHive(this);
    this.bug1Hive = new Bug1Hive(this);
    this.bug2Hive = new Bug2Hive(this);
    this.marioFactory = new MarioFactory(this);
    this.pacmanFactory = new PacmanFactory(this);

    this.puntuation = new Puntuation(this, this.font);
    this.timer = new Timer(this, this.font);
    this.lifeBar = new LifeBar(this);

    this.levelComplete = new LevelComplete(this, this.font);

    this.spell_cloud = new Spell(this, "cloud", 700, 340);
    this.spell_manager = new Spell(this, "sles", 100, 340);
    this.spell_storage = new Spell(this, "storage", 470, 340);
    this.spell_sles = new Spell(this, "manager", 380, 450);
  }

  check_enemy_enabled(enemy){
    return this.level.config.enemies[enemy] != undefined && this.level.config.enemies[enemy].enable
  }

  check_enemy_amount(enemy){
    if (this.level.config.enemies[enemy] == undefined ||
        this.level.config.enemies[enemy].amount == undefined)
      return 0;
    else
      return this.level.config.enemies[enemy].amount;
  }

  registry_object(object){
    this.objects[object.id] = object;
  }

  unregistry_object(object){
    delete this.objects[object.id];
  }

  preload() {
    this.load.spritesheet("smoke", 'assets/img/addons/smoke.png', {
      frameWidth: 128,
      frameHeight: 128,
      margin: 0,
      spacing: 0
    });

    for (var i in this.objects) {
      this.objects[i].preload();
    }
  }

  create() {
    this.anims.create({
      key: 'smoke_play',
      frames: this.anims.generateFrameNumbers('smoke', {
        begin:0,
        end:10
      }),
      scale: 1,
      frameRate: 20,
      repeat: 0
    });
    this.anims.get('smoke_play').hideOnComplete = true;

    for (var i in this.objects) {
      this.objects[i].create();
    }

    this.prepare_level();

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

  level_complete(){
    this.levelComplete.show();
  }

  prepare_level(){
    this.level = new Level(this, levelsConfiguration[gameStatus.level]);

    //if (this.check_enemy_enabled("mario"))
      this.mario = new Mario(this, 350, 200);

    //if (this.check_enemy_enabled("pacman"))
      this.pacman = new Pacman(this, 500, 530, 200);

    for (var i=0; i<this.check_enemy_amount("bee"); i++)
      this.beeHive.create_one_areas();

    for (var i=0; i<this.check_enemy_amount("bug1"); i++)
        this.bug1Hive.create_one_areas();

    for (var i=0; i<this.check_enemy_amount("bug2"); i++)
      this.bug2Hive.create_one_areas();
  }

  enemies_die(){
    for (var i in this.objects){
      if (this.objects[i].is_enemy)
        this.objects[i].die();
    }
  }
}
