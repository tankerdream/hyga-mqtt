var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

hyga.on('error',function(error){
  console.error(error);
});

hyga.connect(function(response){

  console.log('ready');

  var data = {
    color:'red'
  }

  hyga.device(data, function(success,resp){
    if(success){
      console.log('Get the device:');
    }else{
      console.log('Error!');
    }
    console.log(resp);
    process.exit();
  });

});