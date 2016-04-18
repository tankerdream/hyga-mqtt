var Hyga = require('../');

var config = {
  uuid:'e91a0b58-3899-42f2-a667-74da0405a5d8',
  token:'20552f1ed1e360574e011a96ad059958261a09a8'
}

var hyga = new Hyga(config);

hyga.on('error',function(error){
  console.error(error);
});

hyga.on('message',function(data){
  console.log(data);
});

hyga.connect(function(response){

  console.log('ready');

});