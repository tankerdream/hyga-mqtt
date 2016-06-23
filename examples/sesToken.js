var Hyga = require('../');

//频道uuid,即9c417707-420d-4ff1-95b5-dfe9171d5cba的父设备
var config = {
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'eca93fcff5cb940eaee51d0b8b3c3a5fbc9cef4a'
}

var hyga = new Hyga(config);

hyga.on('error',function(error){
  console.error(error);
});

hyga.connect(function(){

  console.log('已接入超星系!');

  var targetDevice = {
    uuid: '9c417707-420d-4ff1-95b5-dfe9171d5cba'
  }

  hyga.sesToken(targetDevice, function(success,resp){
    if(success){
      console.log('获取token:');
    }else{
      console.log('获取失败!');
    }
    console.log(resp);
    process.exit();
  });

});