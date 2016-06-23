var Hyga = require('../');

var config = {
  //频道的UUID及token
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'20552f1ed1e360574e011a96ad059958261a09a8'
}

var hyga = new Hyga(config);

hyga.on('error',function(error){
  console.error(error);
});

hyga.connect(function(response){

  console.log('已接入超星系!');

  var targetDevice = {
    uuid: '3e9fd243-2d75-42a4-89b9-a4e70a51b58d'
  }

  hyga.getToken(targetDevice, function(success,resp){
    if(success){
      console.log('获取token:');
    }else{
      console.log('获取失败!');
    }
    console.log(resp);
    process.exit();
  });

});