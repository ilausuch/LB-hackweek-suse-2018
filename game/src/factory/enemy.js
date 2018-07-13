class Enemy extends BaseObject{
  constructor(scene, name, multiple){
    super(scene, name, multiple);
    this.is_enemy = true;
    this.energy = 1;
    this.puntuation = 1;
    this.injured_counter = 0;

    this.scene.level.register_enemy(this.id);
  }

  configure(config_name){
    for (var key in this.scene.level.config.enemies[config_name]){
      this[key] = this.scene.level.config.enemies[config_name][key];
    }

    this.total_energy = this.energy;
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

  }

  prepareObjects(){

  }

  prepareSounds(){

  }

  setup_coillide_with_walls(){
    var $this = this;
    this.scene.scenario.define_collisions(this.object,
                                          function(a, b){
                                            $this.onCollideFloor();
                                          },
                                          function(a, b){
                                            $this.onCollideWalls();
                                          });
  }

  setup() {
    var $this = this;

    this.setup_coillide_with_walls();

    this.scene.physics.add.collider(this.object, this.scene.objects.hero.object, function(a, b){
      $this.attackToHero(b.owner);
    });
    this.scene.objects.hero.setup_attack_to_enemy(this, function(hero){
      $this.attackedByHero(hero);
    });


    this.injured_interval = setInterval(function(){
      $this.injured_counter = ($this.injured_counter + 1) % $this.total_energy;

      if ($this.injured_counter >= $this.energy)
        $this.object.setTint(0xFF0000);
      else
        $this.object.setTint(undefined);

    },40);
  }

  onCollideFloor(){

  }

  onCollideWalls(){

  }

  attackToHero(to){

  }

  attackedByHero(from){

    if (from.tongue_attack_timestamp !== this.last_attacked_by_hero_timestamp){
      this.last_attacked_by_hero_timestamp = from.tongue_attack_timestamp;

    this.energy = this.energy -1;

    if (this.energy <= 0){
      this.explosion = this.scene.add.sprite(0, 0, 'smoke').setScale(0.8).play("smoke_play");
      this.explosion.x = this.object.body.x + this.object.body.width/2;
      this.explosion.y = this.object.body.y + this.object.body.height/2;

      var plusPuntuation = new PlusPuntuation(this.scene, this.puntuation, this.object.body.x, this.object.body.y);

      this.die();
      this.scene.sound.play('fx_enemy_killed');
      }else{
        this.is_injured = true;
        this.injured_interval_counter = 5;
        this.onAttackedByHero(from);
      }
    }

  }

  launch_explosion(){
  }

  onAttackedByHero(){

  }

  die(){
    clearInterval(this.injured_interval);
    super.die();
  }
}
