class GameStatus{
  constructor(){
    this.reset();
    this.clean();
  }

  reset(){
    this.level = 0;
    this.lives = 3;
    this.energy = 1;
    this.puntuation = 0;
    this.current_spell = undefined;
  }

  clean(){
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
      scene.objects.hero.die();
    }else{
      scene.objects.hero.injured();
    }

    return true;
  }


  increase_puntuation(value){
    this.puntuation = this.puntuation +1;
    scene.objects.puntuation.update_puntuation();
  }

  spellProvider(value) {
    console.log("spellProvider");
    this.current_spell = value;
  }

  nextLevel(){
    gameStatus.level++;
    this.clean();
    scene.prepare_level();
  }
}
