var Hyga = require('../');

var config = {
  //同一频道中 authority=protect 的设备
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'

  //同一频道中 authority=private 的设备
  //"uuid": "f3f7944e-b9f2-4960-bf29-5c6d43181b40",
  //"token": "5bd08a25dfb1d9e7e20346a9de1adea9819253e9"

  //不同频道中 authority=public 的设备
  // "uuid" : "1ad876e1-2366-4f64-820e-d98fb032fe40",
  // "token" : "69e5ef0034e346fd54bc94406af0e09e788d9944"
}

var hyga = new Hyga(config);

hyga.connect(function(response){

  console.log('已接入超星系!');

  var message = {
    payload: '我是超星系新成员.',
    name: '森林火灾预警设备'
  };

  hyga.broadcast(message, function(success, resp){
    if(success){
      console.log('广播成功!');
    }else{
      console.log('广播失败!');
      console.log(resp);
    }
    process.exit();
  });

});