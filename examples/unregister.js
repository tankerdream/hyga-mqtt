var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

var message = {
  uuid:'c42c9008-1007-4337-91fe-8515b41770ac'
};

hyga.connect(function(response){

  console.log('ready');

  hyga.unregister(message, function(success, resp){
    if(success){
      console.log('注销成功!');
    }else{
      console.log('注销失败!');
    }
    console.log(resp);
    process.exit();
  });

});