var Hyga = require('../');

var config = {
  //频道uuid
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'20552f1ed1e360574e011a96ad059958261a09a8'
}

var hyga = new Hyga(config);

hyga.setMessageHandler(function(message){
  console.log('收到来自设备的消息...');
  console.log(message);
});

hyga.connect(function(response){

  console.log('ready');

});