var levelsConfiguration=[
  {
    totalTime : 10,
    scenario: 1,
    hero: {
      posX: 100,
      posY: 500
    },
    enemies:{
      bee:{
        amount: 0,
        puntuation: 5,
        pain: 0.001
      },
      bug2:{
        amount:0,
        puntuation: 1,
        can_attack: false
      },
      mario:{
        enable:false,
        puntuation: 100,
        pain: 0.1,
        attack_pain: 0.4,
        speed: 200,
        attack_speed: 350,
        can_attack:true,
        energy: 1,
        attack_frequency: 0.1,
        jump_frequency: 0.03
      },
      pacman:{
        enable:true,
        puntuation: 50,
        speed: 100,
        pain: 0.2,
        energy: 2,
        persistent_attack: true
      },
      boss:{
        enable:false,
        puntuation: 50,
        speed: 200,
        pain: 0.3,
        persistent_attack: true,
        attack_frequency: 0.1,
        movement_frequency: 0.1,
      }
    }
  },
  {
    totalTime : 10,
    scenario: 2,
    hero: {
      posX: 100,
      posY: 500
    },
    enemies:{
      bee:{
        amount: 1 ,
        puntuation: 5,
        pain: 0.001
      },
      bug1:{
        amount: 0,
        puntuation: 10,
        max_speed: 120,
        chaise_speed: 120,
        attack_distance: 40000,
        acceleration: 20,
        pain: 0.1,
      },
      bug2:{
        amount:0,
        puntuation: 2,
        can_attack: false
      },
      mario:{
        enable:false,
        puntuation: 100,
        pain: 0.1,
        attack_pain: 0.4,
        speed: 200,
        attack_speed: 350,
        can_attack:true,
        energy: 10,
        attack_frequency: 0.1,
        jump_frequency: 0.03
      },
      pacman:{
        enable:false,
        puntuation: 50,
        speed: 100,
        pain: 0.2,
        energy: 10,
        persistent_attack: true
      },
      boss:{
        enable:false,
        puntuation: 50,
        speed: 200,
        pain: 0.3,
        persistent_attack: true,
        attack_frequency: 0.1,
        movement_frequency: 0.1,
      }
    }
  },
  {
    totalTime : 2*60,
    scenario: 3,
    hero: {
      posX: 100,
      posY: 400
    },
    enemies:{
      bee:{
        amount: 10,
        puntuation: 5,
        pain: 0.001
      },
      bug1:{
        amount: 5,
        puntuation: 10,
        max_speed: 120,
        chaise_speed: 120,
        attack_distance: 40000,
        acceleration: 20,
        pain: 0.1,
      },
      bug2:{
        amount:20,
        puntuation: 2,
        can_attack: false
      },
      mario:{
        enable:false,
        puntuation: 100,
        pain: 0.1,
        attack_pain: 0.4,
        speed: 200,
        attack_speed: 350,
        can_attack:true,
        energy: 10,
        attack_frequency: 0.1,
        jump_frequency: 0.03
      },
      pacman:{
        enable:false,
        puntuation: 50,
        speed: 100,
        pain: 0.2,
        energy: 10,
        persistent_attack: true
      },
      boss:{
        enable:true,
        puntuation: 50,
        speed: 200,
        pain: 0.3,
        persistent_attack: true,
        attack_frequency: 0.1,
        movement_frequency: 0.1,
      }
    }
  }
]
