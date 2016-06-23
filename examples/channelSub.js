var Hyga = require('../');

var config = {
  //频道uuid
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'eca93fcff5cb940eaee51d0b8b3c3a5fbc9cef4a'
}

var hyga = new Hyga(config);

hyga.onMsg(function(message){
  console.log('收到来自设备的消息...');
  console.log(message);
});

hyga.connect(function(){

  console.log('频道已接入超星系!');

});