var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

hyga.connect(function(){

  console.log('已接入超星系!');

  var params = {
    uuid: '3e9fd243-2d75-42a4-89b9-a4e70a51b58d'
  }

  hyga.getKey(params, function(success, payload){
    if(success){
      console.log('获取成功.');
    }else{
      console.log('获取失败.');
    }
    console.log(payload);
    process.exit();
  });

});