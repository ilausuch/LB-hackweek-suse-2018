class Scenario{
  constructor(scene, name, image_url, data_url){
    this.name = name;
    this.scene = scene;
    this.image_url = image_url;
    this.data_url = data_url;
  }

  preload(){
    this.scene.load.image(this.name, this.image_url);
    this.scene.load.json(this.name+'_data', this.data_url);
  }

  create(){
    this.data = this.cache.json.get(this.name+'_data');
    
  }

}
