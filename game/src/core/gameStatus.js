class GameStatus{
  constructor(){
    this.reset();
    this.clean();
  }

  reset(){
    this.level = 2;
    this.lives = 3;
    this.energy = 1;
    this.puntuation = 0;
    this.current_spell = undefined;
  }

  clean(){
    this.attacks = {}
  }

  timestamp(){
    return Math.floor((new Date).getTime()/1000);
  }

  decrease_energy(attacker_id, value){
    if (scene.objects.hero.dead)
      return false;

    if (scene.objects.hero.invulnerable_timeout > this.timestamp()){
      console.log("Invulnerable");
      return false;
    }
    else {

      var timestamp = this.timestamp();
      if (this.attacks[attacker_id] == timestamp)
        return false;

      this.attacks[attacker_id] = timestamp;

      this.energy = this.energy - value;
      if (this.energy <= 0){
        this.energy = 0;
        scene.objects.hero.die();
        this.lives --;

        if (this.lives == 0){
          this.gameOver = true;
          scene.game_over();

        }else{
          setTimeout(function(){
            scene.hero.restore();
            if (scene.hurryup_mario){
              scene.hurryup_mario.die();
              scene.hurryup_mario = undefined;
            }
          }, 2000);
        }
      }else{
        scene.objects.hero.injured();
      }

      return true;
    }
  }

  restore_hero(){
    this.energy = 1;
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
    scene.next_level();
  }
}
