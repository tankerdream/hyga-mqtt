var Hyga = require('../');

var config = {
  uuid:'3e9fd243-2d75-42a4-89b9-a4e70a51b58d',
  token:'31b5ee84aff6e4fb2db70d1d2fe43f6e58e7ec6d'
}

var hyga = new Hyga(config);

hyga.on('error',function(error){
  console.error(error);
});

hyga.on('broadcast',function(data){
  console.log(data);
});

hyga.connect(function(response){

  console.log('ready');

  // Message - response emits event 'message'
  var message = {
    devices: [
      //同一频道中 authority='protect' 的设备
      '9c417707-420d-4ff1-95b5-dfe9171d5cba',
      //同一频道中 authority='private' 的设备
      'f3f7944e-b9f2-4960-bf29-5c6d43181b40',
      //不同频道中 authority='public' 的设备
      '1ad876e1-2366-4f64-820e-d98fb032fe40'
    ]
  };

  hyga.subBroadcast(message);

});