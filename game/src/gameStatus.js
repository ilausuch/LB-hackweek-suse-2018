class GameStatus{
  constructor(){
    this.lives = 3;
    this.energy = 1;
    this.puntuation = 0;
  }

  current_scene(scene){
    this.scene = scene;
  }

  decrease_energy(value){
    this.energy = this.energy - value;
    if (this.energy <= 0){
      this.energy = 0;
      this.scene.objects.hero.die();
    }else{
      this.scene.objects.hero.injured();
    }
  }

  increase_puntuation(value){
    this.puntuation = this.puntuation +1;
    this.scene.objects.puntuation.update_puntuation();
  }
}
