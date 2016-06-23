var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

hyga.setMessageHandler(function(message){
  console.log(message);
});

hyga.connect(function(){

  console.log('已接入超星系!');

  var params = {
    power: 56
  };

  hyga.update(params, function(success, payload){
    if(success){
      console.log('设置成功!');
    }else{
      console.log('设置失败!');
      console.log(payload);
    }
    process.exit();
  });

});