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

  console.log('ready');

  var targetDevice = {
    uuid: '9c417707-420d-4ff1-95b5-dfe9171d5cba'
  }

  hyga.getToken(targetDevice, function(success,resp){
    if(success){
      console.log('Get the new token:');
    }else{
      console.log('Error!');
    }
    console.log(resp);
    process.exit();
  });

});