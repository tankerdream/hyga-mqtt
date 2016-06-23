var Hyga = require('../');

//频道uuid,即目标设备的父设备
var config = {
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'eca93fcff5cb940eaee51d0b8b3c3a5fbc9cef4a'
}

var hyga = new Hyga(config);

hyga.connect(function(){

  console.log('已接入超星系!');

  var toDevice = {
    uuid:'59b6a5ff-fb27-4d73-afd8-01e24adba6e1'
  };

  hyga.unregister(toDevice, function(success, resp){
    if(success){
      console.log('删除成功!');
    }else{
      console.log('删除失败!');
      console.log(resp);
    }
    process.exit();
  });

});