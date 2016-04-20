var Hyga = require('../');

var config = {
  //频道的UUID及token
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'20552f1ed1e360574e011a96ad059958261a09a8'
}

var hyga = new Hyga(config);

hyga.connect(function(response){

  console.log('ready');

  // Message - response emits event 'message'
  var message = {
    payload: {from: '频道广播'},
  };

  hyga.broadcast(message,function(success, resp){
    if(success){
      console.log('广播成功!');
    }else{
      console.log('广播失败!');
      console.log(resp);
    }
    process.exit();
  });

});