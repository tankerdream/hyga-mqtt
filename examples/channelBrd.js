var Hyga = require('../');

var config = {
  //频道的UUID及token
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'eca93fcff5cb940eaee51d0b8b3c3a5fbc9cef4a'
}

var hyga = new Hyga(config);

hyga.connect(function(){

  console.log('频道已接入超星系!');

  var message = {
    payload: {from: '频道广播'},
  };

  hyga.brd(message, function(success, resp){
    if(success){
      console.log('广播成功!');
    }else{
      console.log('广播失败!');
      console.log(resp);
    }
    process.exit();
  });

});