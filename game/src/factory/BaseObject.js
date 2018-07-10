class BaseObject{
  constructor(scene, id, multiple){
    this.scene = scene;

    if (multiple)
      this.id = id + "_" + Math.ceil(10000 * Math.random());
    else
      this.id = id;

    this.scene.registry_object(this);
  }

  preload(){

  }

  create(){

  }

  postCreation(){

  }

  delayedCreation(){

  }

  delayedCreation(){

  }

  update(){

  }

  get_screen_object(){
    //By default is object, but must be changed
    return this.object;
  }

  position(){
    var object = this.get_screen_object().body;
    return {x:object.x,
            y:object.y,
            cx:object.x+object.width/2,
            cy:object.y+object.height/2,
            x2:object.x+object.width,
            y2:object.y+object.height};
  }

  distance_to_object(object){
    var position = this.position(true);
    var position2 = object.position(true);

    return (position.x - position2.x) * (position.x - position2.x)
           + (position.y - position2.y) * (position.y - position2.y)
  }
}
