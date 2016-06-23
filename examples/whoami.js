var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

hyga.connect(function(){

  console.log('接入超星系!');

  hyga.whoAmI(function(status, payload){
    if(status){
      console.log('成功!');
    }
    console.log(payload);
    process.exit();
  });

});