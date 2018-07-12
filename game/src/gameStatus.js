class GameStatus{
  constructor(){
    this.lives = 3;
    this.energy = 1;
    this.puntuation = 0;
    this.current_spell = undefined;
  }

  registry_scene(scene){
    this.scene = scene;
  }

  decrease_energy(value){
    this.energy = this.energy - value;
    if (this.energy <= 0){
      this.energy = 0;
      //TODO: notify death
    }
  }


  increase_puntuation(value){
    this.puntuation = this.puntuation +1;
    this.scene.objects.puntuation.update_puntuation();
  }

  spellProvider(value) {
    console.log("spellProvider");
    this.current_spell = value;
  }
}
