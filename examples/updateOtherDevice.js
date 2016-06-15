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

  console.log('接入超星系!');

  var data = {
    "uuid":"3e9fd243-2d75-42a4-89b9-a4e70a51b58d",
    "sleep" : false
  };

  hyga.update(data, function(status, payload){
    if(success){
      console.log('设置成功!');
    }else{
      console.log('设置失败!');
      console.log(resp);
    }
    process.exit();
  });

});