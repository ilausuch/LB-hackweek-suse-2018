var app;

// game configuration object
var gameConfig = {

  // render type
  type: Phaser.AUTO,

  // game width, in pixels
  width: 800,

  // game height, in pixels
  height: 600,

  // game background color
  backgroundColor: 0x444444,

  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: true
    }
  },

   // scenes used by the game
   scene: [game]
};

// once the window loads...
window.onload = function() {

    // game constructor
    app = new Phaser.Game(gameConfig);

    // pure javascript to give focus to the page/frame and scale the game
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = app.config.width / app.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    } 
}
