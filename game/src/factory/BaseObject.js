class BaseObject{
  constructor(scene, id){
    this.scene = scene;
    if (id == undefined)
      this.id = Math.random();
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

  update(){

  }
}
