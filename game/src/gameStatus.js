class GameStatus{
  constructor(){
    this.lives = 3;
    this.energy = 1;
    this.current_spell = undefined;
  }

  decreaseEnergy(value){
    this.energy = this.energy - value;
    if (this.energy <= 0){
      this.energy = 0;
      //TODO: notify death
    }
  }

  spellProvider(value) {
    console.log("spellProvider");
    this.current_spell = value;
  }
}
