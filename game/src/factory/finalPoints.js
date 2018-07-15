class FinalPoints extends BaseObject{
  constructor(scene, font){
    super(scene, "finalPoints");
    this.font = font;
    this.name = ""
    this.saved = false;
  }

  manual_create(final = false){
    if (final){
      this.characters0 = this.font.addString("Congratulations", 30, 150, 0.7, true);
      this.characters0.forEach(function(character){
        character.object.setDepth(2001);
      })
    }
    this.characters = this.font.addString("Points 0000", 230, 250, 0.5, true);
    this.characters2 = this.font.addString("Enter your name", 250, 300, 0.3, true);
    this.charactersName = this.font.addString("-------", 350, 350, 0.3, true);
    this.characters3 = this.font.addString("Press enter to save", 210, 390, 0.3, true);
    this.characters4 = this.font.addString("Saved", 370, 390, 0.3, true);

    this.characters.forEach(function(character){
      character.object.setDepth(2001);
    })

    this.characters2.forEach(function(character){
      character.object.setDepth(2001);
    })

    this.charactersName.forEach(function(character){
      character.object.setDepth(2001);
    })

    this.characters3.forEach(function(character){
      character.object.setDepth(2001);
    })

    this.characters4.forEach(function(character){
      character.object.setDepth(2001);
      character.object.setVisible(false);
    })

    var $this = this;
    var puntuation = 0;

    this.interval = setInterval(function(){
      var d4 = Math.floor(puntuation / 1000);
      var d3 = (puntuation % 1000) / 100;
      var d2 = (puntuation % 100) / 10;
      var d1 = (puntuation % 10)
      $this.characters[7].setCharacter("" + d4);
      $this.characters[8].setCharacter("" + d3);
      $this.characters[9].setCharacter("" + d2);
      $this.characters[10].setCharacter("" + d1);

      if (puntuation == gameStatus.puntuation){
        clearInterval($this.interval);
        $this.can_write = true;
      }

      puntuation ++;

    },5)
  }

  keyboard(event){
    if (!this.saved && this.can_write){
      if ((event.keyCode >= 65 && event.keyCode<=90) || (event.keyCode >= 48 && event.keyCode<=57) || event.key == " "){
        if (this.name.length < 7)
          this.name += event.key;
      }

      if (event.key == "Backspace")
        this.name = this.name.substring(0, this.name.length - 1);

      if (event.key == "Enter"){
        console.log("Save");

        this.characters3.forEach(function(character){
          character.object.setVisible(false);
        })

        this.characters4.forEach(function(character){
          character.object.setVisible(true);
        })

        this.saved = true;

        $.ajax({
          type: "POST",
          url: "/save.php",
          data: {name: this.name, points:gameStatus.puntuation, level:gameStatus.level + 1},
          success: function(){
            location.href = "/";
          }
        });
      }

      var $this = this;
      var i=0;
      this.charactersName.forEach(function(character){
        if (i < $this.name.length)
          character.setCharacter($this.name[i]);
        else
          character.setCharacter("-");

        i++;
      })
    }
  }

}
