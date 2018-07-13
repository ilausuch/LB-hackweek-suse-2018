class GameStatus{
  constructor(){
    this.lives = 3;
    this.energy = 1;
    this.puntuation = 0;
    this.current_spell = undefined;
  }

  current_scene(scene){
    this.scene = scene;
    this.attacks = {}
  }

  decrease_energy(attacker_id, value){
    var timestamp = Math.floor((new Date).getTime()/1000);
    if (this.attacks[attacker_id] == timestamp)
      return false;

    this.attacks[attacker_id] = timestamp;

    this.energy = this.energy - value;
    if (this.energy <= 0){
      this.energy = 0;
      this.scene.objects.hero.die();
      this.lives --;

      if (this.lives == 0){
        //TODO: GAME OVER
      }else{
        //TODO: Wait and restore the scenario
      }
    }else{
      this.scene.objects.hero.injured();
    }

    return true;
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
