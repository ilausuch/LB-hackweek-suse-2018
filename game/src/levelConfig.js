class Level{
  constructor(scene, config){
    this.scene = scene;
    this.config = config;

    this.timeCounter = config.totalTime;
  }


  start(){
    var $this = this;
    //var this.currentTime = Math.floor((new Date).getTime()/1000);
    this.scene.objects.timer.update_time();

    this.timer = setInterval(function(){
      $this.timeCounter = $this.timeCounter -1;
      $this.scene.objects.timer.update_time();
      if ($this.timeCounter == 0){
        window.clearInterval($this.timer);
        $this.timeout();
      }
    },1000);
  }

  timeout(){
    //TODO
  }
}
