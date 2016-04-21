var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

var message = {
  uuid:'75d09bf7-788c-45e4-8f92-04a124f69f86'
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