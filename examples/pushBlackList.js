var Hyga = require('../');

//频道uuid,即9c417707-420d-4ff1-95b5-dfe9171d5cba的父设备
var config = {
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'eca93fcff5cb940eaee51d0b8b3c3a5fbc9cef4a'
}

var hyga = new Hyga(config);

hyga.connect(function(){

  console.log('接入超星系!');

  var data = {
    uuid: '9c417707-420d-4ff1-95b5-dfe9171d5cba',
    list: ['mqtt-blacklist-1','mqtt-blacklist-2']
  };

  hyga.pushBlackList(data,function(success, resp){
    if(success){
      console.log('设置成功!');
    }else{
      console.log('设置失败!');
      console.log(resp);
    }
    process.exit();
  });

});