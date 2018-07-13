var levelsConfiguration=[
  {
    totalTime : 60,
    scenario: 1,
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
        energy: 1,
        persistent_attack: true
      }
    }
  },
  {
    totalTime : 2*60,
    scenario: 0,
    enemies:{
      bee:{
        amount: 1 ,
        puntuation: 5,
        pain: 0.001
      },
      bug1:{
        amount: 1,
        puntuation: 10,
        max_speed: 120,
        chaise_speed: 120,
        attack_distance: 40000,
        acceleration: 20,
        pain: 0.1,
      },
      bug2:{
        amount:10,
        puntuation: 2,
        can_attack: false
      },
      mario:{
        enable:true,
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
      }
    }
  }
]
