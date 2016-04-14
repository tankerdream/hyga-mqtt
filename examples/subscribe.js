var Hyga = require('../');

var config = {
  uuid:'3e9fd243-2d75-42a4-89b9-a4e70a51b58d',
  token:'31b5ee84aff6e4fb2db70d1d2fe43f6e58e7ec6d'
}

var hyga = new Hyga(config);

hyga.on('error',function(error){
  console.error(error);
});

hyga.on('message',function(data){
  console.log(data);
});

hyga.connect(function(response){

  console.log('ready');

  // Message - response emits event 'message'
  // var message = {
  //   devices: ['3e9fd243-2d75-42a4-89b9-a4e70a51b58d'],
  //   topic: 'hello',
  //   payload: {ilove: 'food'},
  //   other: '林允儿'
  // };
  hyga.subscribe('message');
  
});