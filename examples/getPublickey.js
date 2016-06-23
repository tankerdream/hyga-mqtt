var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

hyga.connect(function(response){

  console.log('ready');

  var targetDevice = {
    uuid: '3e9fd243-2d75-42a4-89b9-a4e70a51b58d'
  }

  hyga.getPublicKey(targetDevice, function(success,res){
    if(success){
      console.log('Get PublicKey:');
    }else{
      console.log('Error!');
    }
    console.log(res);
    process.exit();
  });

});