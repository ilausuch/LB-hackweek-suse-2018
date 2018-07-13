class Level{
  constructor(scene, config){
    this.scene = scene;
    this.config = config;

    this.timeCounter = config.totalTime;

    this.enemy_alive = {}
  }


  start(){
    var $this = this;
    //var this.currentTime = Math.floor((new Date).getTime()/1000);
    this.scene.objects.timer.update_time();

    this.timer = setInterval(function(){
      $this.timeCounter = $this.timeCounter - 1;
      $this.scene.objects.timer.update_time();
      if ($this.timeCounter == 0){
        window.clearInterval($this.timer);
        $this.hurryUp();
      }
    },1000);
  }

  hurryUp(){
    this.in_hurryup = true;
    scene.hurry_up();
  }

  restore_hurryup(){
    if (this.in_hurryup){
      this.timeCounter = 60;
      this.start();
      this.in_hurryup = false;
    }
  }

  register_enemy(enemy_id){
    this.enemy_alive[enemy_id] = true;
  }

  enemy_death(enemy_id){
    if (this.enemy_alive[enemy_id]!=undefined){
      this.enemy_alive[enemy_id] = false;

      var all_death = true;
      for (var i in this.enemy_alive)
        all_death = all_death && !this.enemy_alive[i];

      if (all_death){
        window.clearInterval(this.timer);
        scene.level_complete();
      }
    }
  }
}
